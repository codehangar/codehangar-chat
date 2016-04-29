var video = document.querySelector('video');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var cameraStream;

console.log(sliderVal1);

var hdConstraints = {
    video: {
        mandatory: {
            // minWidth: 1280,
            // minHeight: 460
            minWidth: 500,
            minHeight: 420,
            // minWidth: 300,
            // minHeight: 200,
            // maxWidth: 600,
            // maxHeight: 400
        }
    }
};


// Define some vars required later
var w, h, ratio;

function successCallback(stream) {
    console.log("successCallback", stream)
    cameraStream = stream;
    video.src = window.URL.createObjectURL(stream);


    video.onloadedmetadata = setVideoSize;
}

function setVideoSize() {
    // Calculate the ratio of the video's width to height
    ratio = video.videoWidth / video.videoHeight;
    // Define the required width as 100 pixels smaller than the actual video's width
    w = video.videoWidth - 100;
    // Calculate the height based on the video's width and the ratio
    h = parseInt(w / ratio, 10);
    // Set the canvas width and height to the values just calculated
    canvas.width = w;
    canvas.height = h;
}

function errorCallback(obj) {
    console.log("errorCallback", obj)
}

navigator.webkitGetUserMedia(hdConstraints, successCallback, errorCallback);

// Loads a testing overlay image
var img = new Image;
img.onload = function() {
    console.log("img", img)
};
img.crossOrigin = "anonymous";
img.src = '/images/twitch_overlay_by_vapor33_nobg_by_v_a_p_o_r-d7ag3u5.png';


// Loads Audio Beeps
var audio1 = new Audio('audio/beep-07.wav');
var audio2 = new Audio('audio/beep-09.wav');

var gifMeSettings = {};

function updateGifSettings() {
    gifMeSettings.frameCount = sliderVal1;
    gifMeSettings.frameRecordDelay = sliderVal2;
    gifMeSettings.framePlaybackDelay = sliderVal3;
}

function onClick(e) {
    console.log('video click');
    video = e.srcElement;
    setVideoSize();
    updateGifSettings();

    var enableCountdown = document.querySelector('#enableCountdown').checked;

    if (enableCountdown) {
        countdown(4);

        function countdown(count) {
            setTimeout(function() {
                if (count > 0) {
                    document.querySelector('#countdown').textContent = count;
                    if (count === 1) {
                        audio2.play();
                    } else {
                        audio1.play();
                    }
                    countdown(count - 1);
                } else {
                    document.querySelector('#countdown').textContent = '';
                    go();
                }
            }, 1000);
        }
    } else {
        go();
    }

    function go() {
        console.log('go')
        // changeFilter(e);
        // gifShotMe(e);
        gifMe(e);
    }
}



function gifMe(e) {
    var snaps = [];
    var snapsBackwards = [];

    var gif = new GIF({
        workers: 2,
        quality: 0,
        width: w,
        height: h
    });

    recordGif(0);

    function recordGif(i) {
        console.log('record');
        setTimeout(function() {
            snapshot();
            if (i < gifMeSettings.frameCount) {
                document.querySelector('#countdown').textContent = gifMeSettings.frameCount - i;
                recordGif(i + 1);
            } else {
                document.querySelector('#countdown').textContent = '';
                done();
            }
        }, gifMeSettings.frameRecordDelay);
    }

    function snapshot() {
        if (cameraStream) {

            // Define the size of the rectangle that will be filled (basically the entire element)
            ctx.fillRect(0, 0, w, h);
            // Grab the image from the video
            ctx.drawImage(video, 0, 0, w, h);


            // "image/webp" works in Chrome.
            // Other browsers will fall back to image/png.
            // document.querySelector('img').src = canvas.toDataURL('image/webp');

            // draw overlay
            // ctx.drawImage(img, 0, 0, w, h);

            document.querySelector('img').src = canvas.toDataURL('image/webp');
            // var imag = document.querySelector("img").src;
            var imag = new Image;
            imag.onload = function() {
                // console.log("imag", imag)
                snaps.push(imag);
                snapsBackwards.push(imag);
            };
            imag.crossOrigin = "anonymous";
            imag.src = document.querySelector("img").src;


            // snaps.push(canvas.toDataURL('image/webp'));
            // snapsBackwards.push(canvas.toDataURL('image/webp'));

        }

    }

    function done() {
        var length = snaps.length + snapsBackwards.length - 1;
        snapsBackwards.reverse();

        for (var i = 0; i < snaps.length; i++) {
            gif.addFrame(snaps[i], {
                delay: gifMeSettings.framePlaybackDelay,
                copy: true
            });
        }
        for (var i = 0; i < snapsBackwards.length - 1; i++) {
            gif.addFrame(snapsBackwards[i], {
                delay: gifMeSettings.framePlaybackDelay,
                copy: true
            });
        }

        gif.render();
    }

    gif.on('finished', function(blob) {

        // Display gif on page
        var image = URL.createObjectURL(blob);
        var animatedImage = document.createElement('img');
        var li = document.createElement('li');
        var grid = document.getElementById('imgGrid');
        animatedImage.src = image;
        grid.insertBefore( li, grid.firstChild );
        li.appendChild(animatedImage);
        // grid.appendChild(li);
         // += '<li>'+animatedImage+'</li>';

        console.log('grid',grid.innerHTML)

        // Convert blob to File and upload
        var name = image.split('/').pop() + '.' + blob.type.split('/').pop();
        var file = new File([blob], name, {
            type: blob.type
        });
        s3Service.get_signed_request(file);
    });
}

function gifShotMe(e) {
    takeShot();

    function progressCallback(progress) {
        console.log("progress", progress)
    }

    function takeShot() {
        gifshot.createGIF({
            gifWidth: e.srcElement.clientWidth,
            gifHeight: e.srcElement.clientHeight,
            cameraStream: cameraStream,
            keepCameraOn: true,
            interval: 0.1,
            progressCallback: progressCallback
        }, function(obj) {
            console.log("obj", obj)
            if (!obj.error) {
                var image = obj.image,
                    animatedImage = document.createElement('img');
                animatedImage.src = image;
                document.body.appendChild(animatedImage);
            }
        });
    }
}



document.querySelector('video').addEventListener('click', onClick, false);

function findRemotes() {
    var videoElems = document.querySelectorAll('#remoteVideos video');
    for (var i = 0; i < videoElems.length; i++) {
        console.log("videoElems[i]", videoElems[i]);
        videoElems[i].addEventListener('click', onClick, false);
    }
}

/**
 * Created by cassandrawilcox on 3/9/17.
 */
let video;
let canvas;
let ctx;
let cameraStream;

// Define some consts required later
let w;
let h;
// let ratio;

const snaps = [];
const snapsBackwards = [];

// Loads Audio Beeps
const audio1 = new Audio('audio/beep-07.wav');
const audio2 = new Audio('audio/beep-09.wav');

export function init() {
    video = document.querySelector('video');
    canvas  = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
}

const gifMeSettings = {
    frameCount: 5,
    frameRecordDelay: 5,
    framePlaybackDelay: 5
};

function setVideoSize() {
    // Calculate the ratio of the video's width to height
    const ratio = video.videoWidth / video.videoHeight;
    // Define the required width as 100 pixels smaller than the actual video's width
    w = video.videoWidth - 100;
    // Calculate the height based on the video's width and the ratio
    h = parseInt(w / ratio, 10);
    // Set the canvas width and height to the values just calculated
    canvas.width = w;
    canvas.height = h;
}

// function updateGifSettings() {
//     gifMeSettings.frameCount = sliderVal1;
//     gifMeSettings.frameRecordDelay = sliderVal2;
//     gifMeSettings.framePlaybackDelay = sliderVal3;
// }

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
            // go();
        }
    }, 1000);
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
        // const imag = document.querySelector("img").src;
        const imag = new Image;
        imag.onload = function() {
            // console.log("imag", imag)
            snaps.push(imag);
            snapsBackwards.push(imag);
        };
        imag.crossOrigin = 'anonymous';
        imag.src = document.querySelector('img').src;
        // snaps.push(canvas.toDataURL('image/webp'));
        // snapsBackwards.push(canvas.toDataURL('image/webp'));
    }
}

function done(gif) {
    // const length = snaps.length + snapsBackwards.length - 1;
    snapsBackwards.reverse();

    for (let i = 0; i < snaps.length; i++) {
        gif.addFrame(snaps[i], {
            delay: gifMeSettings.framePlaybackDelay,
            copy: true
        });
    }
    for (let i = 0; i < snapsBackwards.length - 1; i++) {
        gif.addFrame(snapsBackwards[i], {
            delay: gifMeSettings.framePlaybackDelay,
            copy: true
        });
    }

    gif.render();
}

function recordGif(i, gif) {
    console.log('record');
    setTimeout(function() {
        snapshot();
        if (i < gifMeSettings.frameCount) {
            document.querySelector('#countdown').textContent = gifMeSettings.frameCount - i;
            recordGif(i + 1, gif);
        } else {
            document.querySelector('#countdown').textContent = '';
            done(gif);
        }
    }, gifMeSettings.frameRecordDelay);
}

function gifMe() {
    const gif = new GIF({
        workers: 2,
        quality: 0,
        width: w,
        height: h
    });

    recordGif(0, gif);


    gif.on('finished', function(blob) {
        // Display gif on page
        const image = URL.createObjectURL(blob);
        const animatedImage = document.createElement('img');
        const li = document.createElement('li');
        const grid = document.getElementById('imgGrid');
        animatedImage.src = image;
        grid.insertBefore( li, grid.firstChild );
        li.appendChild(animatedImage);
        // grid.appendChild(li);
        // += '<li>'+animatedImage+'</li>';

        console.log('grid', grid.innerHTML);

        // Convert blob to File and upload
        // const name = image.split('/').pop() + '.' + blob.type.split('/').pop();
        // const file = new File([blob], name, {
        //     type: blob.type
        // });
        // s3Service.get_signed_request(file);
    });
}

export function onClick(e) {
    console.log('video click');
    video = e.srcElement;
    setVideoSize();
    // updateGifSettings();

    const enableCountdown = document.querySelector('#enableCountdown').checked;

    if (enableCountdown) {
        countdown(4);
    } else {
        go();
    }

    function go() {
        console.log('go');
        // changeFilter(e);
        // gifShotMe(e);
        gifMe(e);
    }
}

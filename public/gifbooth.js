var video = document.querySelector('video');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var cameraStream;

var hdConstraints = {
    video: {
        mandatory: {
            // minWidth: 1280,
            // minHeight: 460
            minWidth: 600,
            minHeight: 400
        }
    }
};


// Define some vars required later
var w, h, ratio;

function successCallback(stream) {
    console.log("successCallback", stream)
    cameraStream = stream;
    video.src = window.URL.createObjectURL(stream);


    video.onloadedmetadata = function() {
        // Calculate the ratio of the video's width to height
        ratio = video.videoWidth / video.videoHeight;
        // Define the required width as 100 pixels smaller than the actual video's width
        w = video.videoWidth - 100;
        // Calculate the height based on the video's width and the ratio
        h = parseInt(w / ratio, 10);
        // Set the canvas width and height to the values just calculated
        canvas.width = w;
        canvas.height = h;
    };
}

function errorCallback(obj) {
    console.log("errorCallback", obj)
}

navigator.webkitGetUserMedia(hdConstraints, successCallback, errorCallback);

var gif = new GIF({
    workers: 2,
    quality: 0,
    width: w,
    height: h
});

gif.on('finished', function(blob) {
    // window.open(URL.createObjectURL(blob));
    var image = URL.createObjectURL(blob),
        animatedImage = document.createElement('img');
    animatedImage.src = image;
    document.body.appendChild(animatedImage);
});


// Loads a testing overlay image
var img = new Image;
img.onload = function() {
    console.log("img", img)
};
img.crossOrigin = "anonymous";
img.src = 'http://img.lapseshot.com/images/i.imgur.com/JzQ3m4E.png';

function snapshot(e) {
    if (cameraStream) {

        // Define the size of the rectangle that will be filled (basically the entire element)
        console.log("w", w)
        ctx.fillRect(0, 0, w, h);
        // Grab the image from the video
        ctx.drawImage(video, 0, 0, w, h);


        // "image/webp" works in Chrome.
        // Other browsers will fall back to image/png.
        // document.querySelector('img').src = canvas.toDataURL('image/webp');

        // draw overlay
        ctx.drawImage(img, 0, 0, w, h);

        // add an image element
        gif.addFrame(canvas, {
            delay: 50,
            copy: true
        });
    }
}

function done() {
    console.log("done")
    gif.render();
}


function onClick(e) {
    console.log("e", e)
    console.log("e.target", e.target)
        // changeFilter(e);
        // gifMe(e);
    snapshot(e);
}

function progressCallback(progress) {
    console.log("progress", progress)
}


function gifMe(e) {
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


var idx = 0;
var filters = [
    // 'aden',
    // 'reyes',
    // 'perpetua',
    'inkwell',
    // 'earlybird',
    // 'toaster',
    // 'walden',
    // 'hudson',
    // 'gingham',
    // 'mayfair',
    // 'lofi',
    // 'xpro2',
    // '_1977',
    // 'brooklyn',
    // 'nashville',
    // 'lark',
    // 'moon',
    ''
];

function changeFilter(e) {
    console.log("e", e)
    var el = e.target;
    el.className = '';
    var effect = filters[idx++ % filters.length]; // loop through filters.
    if (effect) {
        el.classList.add(effect);
    }
}

// document.querySelector('video').addEventListener('click', onClick, false);

function findRemotes() {
    document.querySelector('#remoteVideos video').addEventListener('click', onClick, false);
}

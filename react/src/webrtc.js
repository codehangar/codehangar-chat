
var webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'localVideo',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: 'remoteVideos',
    autoRequestMedia: true,
    media: {
        video: {
            mandatory: {
                minWidth: 600,
                minHeight: 400

            }
        },
        audio: true
    },
    url: 'https://signalserver.herokuapp.com'
});
// we have to wait until it's ready
webrtc.on('readyToCall', function() {
    // you can name it anything
    var roomName = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
    webrtc.joinRoom(roomName);
});

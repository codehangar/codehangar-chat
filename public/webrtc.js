
var webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'localVideo',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: 'remoteVideos',
    // immediately ask for camera access
    // autoRequestMedia: true,
    // dont ask for camera access
    autoRequestMedia: true,
    // dont negotiate media
    // media: {
    //     video: true,
    //     audio: false
    // },
    media: {
        video: {
            mandatory: {
                // minWidth: 1280,
                // minHeight: 460
                minWidth: 600,
                minHeight: 400
                    // minWidth: 300,
                    // minHeight: 200,
                    // maxWidth: 600,
                    // maxHeight: 400
            }
        },
        audio: true
    },
    url: 'http://signalserver.herokuapp.com'
});
// we have to wait until it's ready
webrtc.on('readyToCall', function() {
    // you can name it anything
    var roomName = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
    webrtc.joinRoom(roomName);
});

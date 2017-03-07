/**
 * Created by Valetery on 3/3/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import Webcam from 'react-webcam';
// got webcam from https://github.com/cezary/react-webcam

const showVideo = () => {
    return(
        <div className="row">
            <div className="col-xs-12 text-center video-feeds" id="remoteVideos">
                 <Webcam className="video-feeds__feed" id="localVideo" autoPlay />
            </div>
        </div>
    );
};

export default connect()(showVideo);

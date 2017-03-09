/**
 * Created by Valetery on 3/3/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import Webcam from 'react-webcam';
// got webcam from https://github.com/cezary/react-webcam
import {onClick, init} from './gif-utils';
import './gif';
import './gif.worker';

const showVideo = () => {
    setTimeout(init, 2000);

    return (
        <div className="row">
            <div className="col-xs-12 text-center video-feeds" id="remoteVideos">
                <Webcam className="video-feeds__feed" id="localVideo" autoPlay onClick={onClick}/>
            </div>
        </div>
    );
};

export default connect()(showVideo);
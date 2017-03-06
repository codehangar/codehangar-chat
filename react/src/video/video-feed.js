/**
 * Created by Valetery on 3/3/2017.
 */
import React from 'react';
import {connect} from 'react-redux';

const showVideo = () => {
    return(
        <div className="row">
            <div className="col-xs-12 text-center video-feeds" id="remoteVideos">
                <video className="video-feeds__feed" id="localVideo" autoPlay></video>
            </div>
        </div>
    );
};

export default connect()(showVideo);

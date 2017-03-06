/**
 * Created by Valetery on 3/3/2017.
 */
import React from 'react';
import {connect} from 'react-redux';

const gifControls = () => {
    return (
        <div className="gif-controls panel panel-default">
            <div className="panel-heading">
                Control Panel
            </div>
            <div className="panel-body collapse" id="collapse">
                <div className="row">
                    <div className="col-md-4">
                        {/* <!-- FRAME COUNT SLIDER -->*/}
                    </div>
                    <div className="col-md-4">
                        {/* <!-- FRAME COUNT SLIDER -->*/}
                    </div>
                    <div className="col-md-4">
                        {/* <!-- FRAME PLAYBACK SLIDER -->*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect()(gifControls);

/**
 * Created by Valetery on 3/5/2017.
 */
import React, { Component }from 'react';

class ChatHeader extends Component {
    render() {
        return (
            <div className="row">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">gifchat.me</a>
                        </div>
                        <strong><p id="countdown" className="lead pull-right">asdf</p></strong>
                    </div>
                </nav>
            </div>
        );
    }
}

export default ChatHeader;

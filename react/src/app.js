import React, { PropTypes } from 'react';
import './styles/main.scss';
import Header from './header/header.js';
import VideoFeed from './video/video-feed';
import GifControl from './gif-controls/gif-controls';

const App = ({}) =>(
    <div>
        <Header/>
        <VideoFeed/>
        <GifControl/>
        <h3>Uploads:</h3>
        <div id="uploads"></div>
        <hr />
        <h3>Gif Booth</h3>
    </div>);

App.propTypes = {
    children: PropTypes.object
};

export default App;

// import './styles.scss';
// import VideoPlayer from './VideoPlayer';

// const src = './src/videos/fire.mov';

// let Player = new VideoPlayer(src, true, true, 1, 1);
// Player.doScenarios();

import * as React from 'react';
import * as ReactDOM from "react-dom";
import VideoPlayer from './components/VideoPlayer/VideoPlayer';

ReactDOM.render(
    React.createElement(VideoPlayer),
    document.getElementById('container')
);
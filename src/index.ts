// import './styles.scss';
// import VideoPlayer from './VideoPlayer';

// const src = './src/videos/fire.mov';

// let Player = new VideoPlayer(src, true, true, 1, 1);
// Player.doScenarios();

import * as React from 'react';
import * as ReactDOM from "react-dom";
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';


declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducer, composeEnhancers())


ReactDOM.render(
    React.createElement(Provider, {
        store: store
    },
        React.createElement(VideoPlayer, null)),
    document.getElementById('container')

);

// without redux
// React.createElement(VideoPlayer),
// document.getElementById('container')
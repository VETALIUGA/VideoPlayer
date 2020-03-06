import * as React from 'react';
import * as ReactDOM from "react-dom";

import { Provider } from 'react-redux';
import { store } from './redux/store';

import PlayerApp from './PlayerApp';

const rootElement = document.getElementById("container");

ReactDOM.render(
  <Provider store={store}>
    <PlayerApp />
  </Provider>,
  rootElement

);

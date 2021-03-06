import { createStore, compose, applyMiddleware  } from "redux";
// import rootReducer from "./reducers/player";
import rootReducer from "./reducers/combined";
import throttledMiddleware from './middleware/throttled';
import thunk from 'redux-thunk';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export default createStore(
//     playerReducer,
//     composeEnhancers()
// );

const createStoreWithMiddleware =  composeEnhancers(applyMiddleware(throttledMiddleware, thunk))(createStore)

export const store = createStoreWithMiddleware(rootReducer);
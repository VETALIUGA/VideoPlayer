import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import player from "./player";

export default combineReducers({ 
    player,
    form: formReducer
 });
 
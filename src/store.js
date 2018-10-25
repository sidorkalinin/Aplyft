import AppReducer from './reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

// console.log("creating the store");

export default store = createStore(AppReducer, {}, applyMiddleware(thunk));
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

let reducer = combineReducers({});
let reducerState = {};
let store = createStore(reducer, reducerState, compose(applyMiddleware(thunk)));

export default store;

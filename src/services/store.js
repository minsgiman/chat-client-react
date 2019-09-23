import {applyMiddleware, createStore} from "redux";
import {createLogger} from "redux-logger";
import reducer from "./../reducers";

const loggerMiddleware = createLogger();
const store = createStore(
    reducer,
    applyMiddleware(
        loggerMiddleware
    )
);

export default store;
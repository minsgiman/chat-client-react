import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {createLogger} from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'

import './common.less'

const loggerMiddleware = createLogger();
const store = createStore(
    reducer,
    applyMiddleware(
        loggerMiddleware
    )
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

export {store};
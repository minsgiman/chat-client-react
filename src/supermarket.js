import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './containers/SuperMarketApp';
import RootStore from './services/supermarket-store';

const root = new RootStore();

ReactDOM.render(
    <Provider {...root}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
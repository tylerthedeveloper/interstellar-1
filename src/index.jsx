import React from 'react';
import { render } from 'react-dom';
import {applyMiddleware, createStore, compose} from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import App from './app';

//router initialization
const history  = createHistory();
const middleware = routerMiddleware(history);

//redux initialization
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(routerReducer, composeEnhancers(applyMiddleware(middleware)));


//app attachment
render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
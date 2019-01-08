import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxLogger } from '@/util/loggerUtil';

import rootReducer from './reducer';
import routes from "./routes";
import { GRouter } from "@/g/component";
import Entry from "@/component/Entry";

const preloadedState = window.__PRELOADED_STATE__;
const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, reduxLogger)
);

class Mentor extends Entry {
    render() {
        return (
            <Provider store={store}>
                <GRouter routes={routes} />
            </Provider>
        );
    }
}

ReactDOM.render(<Mentor />, document.getElementById('root'));

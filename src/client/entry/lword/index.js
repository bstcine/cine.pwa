import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { Provider } from 'react-redux';
import rootReducer from './reducer';
import { WordRouter } from './wordRouter';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker
            .register('/sw-learn.js', { scope: '/learn' })
            .then(function(registration) {
                // 注册成功
                console.log(
                    'ServiceWorker registration successful with scope: ',
                    registration.scope
                );
            })
            .catch(function(err) {
                // 注册失败:(
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

const preloadedState = window.__PRELOADED_STATE__;
const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));

class WordLearn extends Component {
    render() {
        return (
            <Provider store={store}>
                <WordRouter />
            </Provider>
        );
    }
}

ReactDOM.render(<WordLearn />, document.getElementById('root'));
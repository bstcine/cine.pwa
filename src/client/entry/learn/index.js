import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducer';
import HomePage from './container/HomePage';
import HistoryTaskPage from './container/HistoryTaskPage';
import { URL_Learn_Index, URL_Learn_Task } from '@/constant/menuItemUrl';
import Entry from '@/component/Entry';
import { GRouter } from '@/g/component';

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

const routes = [
    { path: URL_Learn_Index, component: HomePage, exact: true, checkAuth: true },
    { path: URL_Learn_Task, component: HistoryTaskPage, checkAuth: true },
];

class Learn extends Entry {
    render() {
        return (
            <Provider store={store}>
                <GRouter routes={routes} />
            </Provider>
        );
    }
}

ReactDOM.render(<Learn />, document.getElementById('root'));

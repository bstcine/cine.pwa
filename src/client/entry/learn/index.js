import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Entry from '@/component/Entry';
import rootReducer from './reducer';
import { GRouter } from '@/g/component';
import routes from './routes';
import interSiteCodeUtil from '@/util/_base/interSiteCodeUtil';

if ('serviceWorker' in navigator) {
    if (interSiteCodeUtil.inAndroidAPP()) {
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
    } else {
        navigator.serviceWorker
            .getRegistrations()
            .then(function(registrations) {
                for (let registration of registrations) {
                    registration.unregister();
                }
            });
    }
}

const preloadedState = window.__PRELOADED_STATE__;
const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));

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

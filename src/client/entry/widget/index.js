import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducer';
const store = createStore(rootReducer, applyMiddleware(thunk));
import routes from './routes';
import { GRouter } from '@/g/component';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker
            .register('/sw-widget.js', { scope: '/widget' })
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

class Widget extends Component {
    render() {
        return (
            <Provider store={store}>
                <GRouter routes={routes} />
            </Provider>
        );
    }
}

ReactDOM.render(<Widget />, document.getElementById('root'));

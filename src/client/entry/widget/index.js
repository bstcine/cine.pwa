import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducer';
import { reduxLogger } from '@/util/loggerUtil';
const store = createStore(rootReducer, applyMiddleware(thunk, reduxLogger));
import routes from './routes';
import { GRouter } from '@/g/component';
import Entry from '@/component/Entry';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for (let registration of registrations) {
            registration.unregister();
        }
    });
}

class Widget extends Entry {
    render() {
        return (
            <Provider store={store}>
                <GRouter routes={routes} />
            </Provider>
        );
    }
}

ReactDOM.render(<Widget />, document.getElementById('root'));

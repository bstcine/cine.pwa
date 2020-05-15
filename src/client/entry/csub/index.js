import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Entry from '@/component/Entry';
import { Provider } from 'react-redux';
import rootReducer from './reducer';
import routes from '@/entry/csub/routes';
import { GRouter } from '@/g/component';

const preloadedState = window.__PRELOADED_STATE__;
const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));

class SubPage extends Entry {
    render() {
        return (
            <Provider store={store}>
                <GRouter routes={routes} />
            </Provider>
        );
    }
}

ReactDOM.render(<SubPage />, document.getElementById('root'));

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducer';
import thunk from 'redux-thunk';
import App from './container/App';
const store = createStore(rootReducer, applyMiddleware(thunk));
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

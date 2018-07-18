import React, { PureComponent } from 'react';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducer';
import { reduxLogger } from '@/util/loggerUtil';
const store = createStore(rootReducer, applyMiddleware(thunk, reduxLogger));
import Container from './Container';

export default class Widget extends PureComponent {
    render() {
        return (
            <Provider store={store}>
                <Container />
            </Provider>
        );
    }
}

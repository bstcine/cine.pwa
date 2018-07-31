import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducer';
import { reduxLogger } from '@/util/loggerUtil';
const store = createStore(rootReducer, applyMiddleware(thunk, reduxLogger));
import { WidgetRouter } from './indexRouter';

class Widget extends Component {
    render() {
        return (
            <Provider store={store}>
                <WidgetRouter />
            </Provider>
        );
    }
}

ReactDOM.render(<Widget />, document.getElementById('root'));

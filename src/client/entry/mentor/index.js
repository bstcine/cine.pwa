import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxLogger } from '@/util/loggerUtil';

import rootReducer from './reducer';
import { MentorRouter } from './mentorRouter';

const preloadedState = window.__PRELOADED_STATE__;
const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk, reduxLogger));

class Mentor extends Component {
    render() {
        return (
            <Provider store={store}>
                <MentorRouter />
            </Provider>
        );
    }
}

ReactDOM.render(<Mentor />, document.getElementById('root'));

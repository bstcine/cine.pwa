import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducer';
import { LearnRouter } from './learnRouter';

const preloadedState = window.__PRELOADED_STATE__;
const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));

class Mentor extends Component {
    render() {
        return (
            <Provider store={store}>
                <LearnRouter />
            </Provider>
        );
    }
}

ReactDOM.render(<Mentor />, document.getElementById('root'));

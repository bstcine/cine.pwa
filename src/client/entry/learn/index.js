import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import rootReducer from './reducer';
import HomePage from './container/HomePage';
import Entry from '@/component/Entry';
import CommonUtil from '@/util/common';

const preloadedState = window.__PRELOADED_STATE__;
const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));

class Learn extends Entry {
    render() {
        return (
            <Router>
                <Provider store={store}>
                    <Route
                        path="/learn/home"
                        component={props => {
                            if (!CommonUtil.isAuth()) return <div />;
                            return <HomePage {...props} />;
                        }}
                    />
                </Provider>
            </Router>
        );
    }
}

ReactDOM.render(<Learn />, document.getElementById('root'));

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import rootReducer from './reducer';
import HomePage from './container/HomePage';
import VocabularyContainer from './container/vocabularyTaskContainer';
import HistoryTaskContainer from './container/historyTaskContainer';
import VocabularyTestContainer from './container/vocabularyTestContainer';
// import * as OfflinePluginRuntime from 'offline-plugin/runtime';
// OfflinePluginRuntime.install();

const preloadedState = window.__PRELOADED_STATE__;
const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));

class Learn extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route
                            exact
                            path="/learn"
                            component={props => {
                                return <HomePage {...props} />;
                            }}
                        />

                        <Route
                            path="/learn/vocabularytask"
                            component={props => {
                                return <VocabularyContainer {...props} />;
                            }}
                        />

                        <Route
                            path="/learn/historytask"
                            component={props => {
                                return <HistoryTaskContainer {...props} />;
                            }}
                        />

                        <Route
                            path="/learn/vocabularytest"
                            component={props => {
                                return <VocabularyTestContainer {...props} />;
                            }}
                        />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<Learn />, document.getElementById('root'));

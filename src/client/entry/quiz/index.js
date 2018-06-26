import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import rootReducer from './reducer';
import QuizPage from './container/QuizPage';
import Entry from '@/component/Entry';
import CommonUtil from '@/util/common';
// import '@/util/test';

const logger = store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
};

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

class Quiz extends Entry {
    render() {
        return (
            <Router>
                <Provider store={store}>
                    <React.Fragment>
                        <Route
                            path="/quiz/kj"
                            component={props => {
                                if (!CommonUtil.isAuth()) return <div />;
                                return <QuizPage {...props} />;
                            }}
                        />
                        <Route
                            path="/quiz/grammar"
                            component={props => {
                                if (!CommonUtil.isAuth()) return <div />;
                                return <QuizPage {...props} />;
                            }}
                        />
                    </React.Fragment>
                </Provider>
            </Router>
        );
    }
}

ReactDOM.render(<Quiz />, document.getElementById('root'));

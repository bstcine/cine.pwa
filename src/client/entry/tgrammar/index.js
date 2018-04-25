import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import rootReducer from './reducer';
import QuizPage from './container/QuizPage';
import StatsListPage from './container/StatsListPage';
import storeUtil from '@/util/storeUtil';
import logger from 'redux-logger';
import { getParam } from '@/util/urlUtil';
import Entry from '@/component/Entry';

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

const createComponent = (Component, userRequired, props) => {
    if (userRequired && !storeUtil.getToken() && !getParam().token) {
        location.href = '/login?go=' + encodeURIComponent(location.href);
        return;
    }
    return <Component {...props} />;
};

class Tgrammar extends Entry {
    render() {
        return (
            <Router>
                <Provider store={store}>
                    <React.Fragment>
                        <Route
                            path="/tgrammar/quiz"
                            component={props =>
                                createComponent(
                                    QuizPage,
                                    /* userRequired */ true,
                                    props
                                )
                            }
                        />
                        <Route
                            path="/tgrammar/stats/list"
                            component={props =>
                                createComponent(
                                    StatsListPage,
                                    /* userRequired */ true,
                                    props
                                )
                            }
                        />
                    </React.Fragment>
                </Provider>
            </Router>
        );
    }
}
ReactDOM.render(<Tgrammar />, document.getElementById('root'));

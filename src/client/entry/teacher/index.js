import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import rootReducer from '../quiz/reducer';
import StatsListPage from '../quiz/container/StatsListPage';
import Entry from '@/component/Entry';
import CommonUtil from '@/util/common';
// import '@/util/test';

const store = createStore(rootReducer, applyMiddleware(thunk));

class Teacher extends Entry {
    render() {
        return (
            <Router>
                <Provider store={store}>
                    <Route
                        path="/teacher/dashboard"
                        component={props => {
                            if (!CommonUtil.isAuth()) return <div />;
                            return <StatsListPage {...props} />;
                        }}
                    />
                </Provider>
            </Router>
        );
    }
}
ReactDOM.render(<Teacher />, document.getElementById('root'));

import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import QuizPage from './QuizPage';
import StatsListPage from './StatsListPage';

const Root = ({ store }) => (
    <Provider store={store}>
        <React.Fragment>
            <Route path="/tgrammar/quiz" component={QuizPage} />
            <Route path="/tgrammar/stats/list" component={StatsListPage} />
        </React.Fragment>
    </Provider>
);

export default Root;

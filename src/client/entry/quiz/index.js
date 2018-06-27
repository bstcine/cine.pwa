import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducer';
import QuizPage from './container/QuizPage';
import Entry from '@/component/Entry';
import { CRouter } from '@/component/CRouter';
import { reduxLogger } from '@/util/loggerUtil';
import * as h5 from '@/constant/menuItemUrl';
import Root from './container/root';

const store = createStore(rootReducer, applyMiddleware(thunk, reduxLogger));

const routes = {
    path: '/quiz',
    component: Root,
    routes: [
        {
            isExact: true,
            path: h5.URL_Quiz_Index,
            component: QuizPage,
        },
        {
            path: h5.URL_Quiz_Kj,
            component: QuizPage,
        },
        {
            path: h5.URL_Quiz_Grammar,
            component: QuizPage,
        },
    ],
    checkAuth: true,
};

class Quiz extends Entry {
    render() {
        return (
            <Provider store={store}>
                <CRouter route={routes} />
            </Provider>
        );
    }
}

ReactDOM.render(<Quiz />, document.getElementById('root'));

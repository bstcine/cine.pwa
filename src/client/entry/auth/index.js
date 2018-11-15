import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { URL_Auth_Bind } from '@/constant/menuItemUrl';
import Entry from '@/component/Entry';
import { GRouter } from '@/g/component';
import rootReducer from './reducer';
import BindPage from '@/entry/auth/container/BindPage';
const store = createStore(rootReducer, applyMiddleware(thunk));
import '@/entry/auth/asset/style/index.less';

const routes = [
    {
        path: URL_Auth_Bind,
        component: BindPage,
        exact: true,
        checkAuth: false,
    },
];

class Learn extends Entry {
    render() {
        return (
            <Provider store={store}>
                <GRouter routes={routes} />
            </Provider>
        );
    }
}

ReactDOM.render(<Learn />, document.getElementById('root'));

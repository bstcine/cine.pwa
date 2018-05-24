import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import rootReducer from '../tgrammar/reducer';
import OrderCoupon from './component/OrderCoupon';
import Entry from '@/component/Entry';
import CommonUtil from '@/util/common';
import './asset/style/index.less';
// import '@/util/test';

const store = createStore(rootReducer, applyMiddleware(thunk));

class Temp extends Entry {
    render() {
        return (
            <Router>
                <Provider store={store}>
                    <Route
                        path="/temp/promote"
                        component={props => {
                            if (!CommonUtil.isAuth()) return <div />;
                            return <OrderCoupon {...props} />;
                        }}
                    />
                </Provider>
            </Router>
        );
    }
}
ReactDOM.render(<Temp />, document.getElementById('root'));

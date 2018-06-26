import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import OrderCoupon from './component/OrderCoupon';
import Entry from '@/component/Entry';
import CommonUtil from '@/util/common';
import './asset/style/index.less';
// import '@/util/test';

class Temp extends Entry {
    render() {
        return (
            <Router>
                <Route
                    path="/temp/promote"
                    component={props => {
                        if (!CommonUtil.isAuth()) return <div />;
                        return <OrderCoupon {...props} />;
                    }}
                />
            </Router>
        );
    }
}
ReactDOM.render(<Temp />, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import OrderCoupon from './component/OrderCoupon';
import ReceiveCoupon from './component/ReceiveCoupon';
import DrawCoupon from './component/DrawCoupon';
import Entry from '@/component/Entry';
import CommonUtil from '@/util/common';
import './asset/style/index.less';
// import '@/util/test';

class Temp extends Entry {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <Route
                        path="/temp/promote"
                        component={props => {
                            if (!CommonUtil.isAuth()) return <div />;
                            return <OrderCoupon {...props} />;
                        }}
                    />
                </Router>
                <Router>
                    <Route
                        path="/temp/coupon/receive"
                        component={props => {
                            return <ReceiveCoupon {...props} />;
                        }}
                    />
                </Router>
                <Router>
                    <Route
                        path="/temp/draw/coupon"
                        component={props => {
                            return <DrawCoupon {...props} />;
                        }}
                    />
                </Router>
            </React.Fragment>
        );
    }
}
ReactDOM.render(<Temp />, document.getElementById('root'));

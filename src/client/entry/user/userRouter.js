import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CommonUtil from '@/util/common';
import Root from '@/entry/user/containers/Root';
import CouponContainer from '@/entry/user/containers/CouponContainer';
import PointContainer from '@/entry/user/containers/PointContainer';

const routes = routes =>
    routes.map((route, i) => (
        <Route
            key={i}
            path={route.path}
            render={props => <route.component {...props} />}
        />
    ));

const CRouter = ({ route }) => (
    <Router>
        <Route
            path={route.path}
            render={props => {
                if (route.willCheckAuth && !CommonUtil.isAuth()) return <div />;
                return (
                    <route.component {...props} routes={routes(route.routes)} />
                );
            }}
        />
    </Router>
);

const userRoute = {
    path: '/user',
    component: Root,
    routes: [
        {
            path: '/user/coupon',
            component: CouponContainer,
        },
        {
            path: '/user/integral',
            component: PointContainer,
        },
    ],
    willCheckAuth: true,
};
export const UserRouter = () => <CRouter route={userRoute} />;

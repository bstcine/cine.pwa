import React from 'react';
import { Route } from 'react-router-dom';

import Root from '@/entry/user/containers/Root';
import CouponContainer from '@/entry/user/containers/CouponContainer';
import PointContainer from '@/entry/user/containers/PointContainer';

import CommonUtil  from '@/util/common';

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
};

const RouteWithSubRoutes = () => (
    <Route
        path={userRoute.path}
        render={props => {
            if (!CommonUtil.isAuth()) return <div/>;
            return <userRoute.component {...props} routes={userRoute.routes} />;
        }}
    />
);

export default RouteWithSubRoutes;
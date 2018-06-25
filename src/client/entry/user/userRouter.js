import React from 'react';

import { CRouter } from '@/component/CRouter';
import Root from '@/entry/user/containers/Root';
import CouponContainer from '@/entry/user/containers/CouponContainer';
import PointContainer from '@/entry/user/containers/PointContainer';

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
    checkAuth: true,
};
export const UserRouter = () => <CRouter route={userRoute} />;

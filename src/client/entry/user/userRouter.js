import React from 'react';

import { CRouter } from '@/component/CRouter';
import Root from '@/entry/user/containers/Root';
import CouponContainer from '@/entry/user/containers/CouponContainer';
import PointContainer from '@/entry/user/containers/PointContainer';
import QuizContainer from '@/entry/user/containers/QuizContainer';
import OrderContainer from '@/entry/user/containers/OrderContainer';

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
        {
            path: '/user/quiz',
            component: QuizContainer,
        },
        {
            path: '/user/order',
            component: OrderContainer,
        },
    ],
    checkAuth: true,
};
export const UserRouter = () => <CRouter route={userRoute} />;

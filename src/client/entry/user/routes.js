import Root from '@/entry/user/containers/Root';
import CouponContainer from '@/entry/user/containers/CouponContainer';
import PointContainer from '@/entry/user/containers/PointContainer';
import QuizContainer from '@/entry/user/containers/QuizContainer';
import OrderContainer from '@/entry/user/containers/OrderContainer';

const routes = [
    {
        path: '/user',
        component: Root,
        checkAuth: true,
        exact: true,
    },
    {
        path: '/user/coupon',
        component: CouponContainer,
        checkAuth: true,
    },
    {
        path: '/user/integral',
        component: PointContainer,
        checkAuth: true,
    },
    {
        path: '/user/quiz',
        component: QuizContainer,
        checkAuth: true,
    },
    {
        path: '/user/order',
        component: OrderContainer,
        checkAuth: true,
    },
];

export default routes;

import OrderCoupon from './component/OrderCoupon';
import ReceiveCoupon from './component/ReceiveCoupon';
import LotteryCoupon from './component/DrawCoupon';
import ExpCourse from './component/ExpCourse';

const routes = [
    {
        path: '/temp/promote',
        component: OrderCoupon,
        checkAuth: true,
    },
    {
        path: '/temp/coupon/receive',
        component: ReceiveCoupon,
    },
    {
        path: '/temp/draw/coupon',
        component: LotteryCoupon,
    },
    {
        path:'/temp/exp',
        component:ExpCourse
    }
];

export default routes;

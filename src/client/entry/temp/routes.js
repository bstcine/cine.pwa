import OrderCoupon from './component/OrderCoupon';
import ReceiveCoupon from './component/ReceiveCoupon';
import LotteryCoupon from './component/DrawCoupon';

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
];

export default routes;

import OrderCoupon from './component/OrderCoupon';
import ReceiveCoupon from './component/ReceiveCoupon';
import LotteryCoupon from './component/DrawCoupon';
import ExpCourse from './component/ExpCourse';
import CouponCourse from './component/CouponCourse';
import ExpX1u1Course from "@/entry/temp/component/ExpX1u1Course";

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
        path: '/temp/exp',
        component: ExpCourse,
    },
    {
        path: '/temp/expx1u1',
        component: ExpX1u1Course,
    },
    {
        path: '/temp/coupon',
        component: CouponCourse,
    },
];

export default routes;

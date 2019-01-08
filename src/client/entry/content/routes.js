import { chunkComponent } from '@/util/chunkComponent';
import Home from "@/entry/content/component/Home";
import Course from "@/entry/content/component/Course";
const PayPrepare = chunkComponent(() =>
    import(/* webpackChunkName: "content/chunk/index.pp" */ './component/PayPrepare')
);
const PayCenter = chunkComponent(() =>
    import(/* webpackChunkName: "content/chunk/index.pc" */ './component/PayCenter')
);
const PayStatus = chunkComponent(() =>
    import(/* webpackChunkName: "content/chunk/index.ps" */ './component/PayStatus')
);
const PayStripe = chunkComponent(() =>
    import(/* webpackChunkName: "content/chunk/index.pss" */ './component/PayStripe')
);

const routes = [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    { path: '/content/course', component: Course },
    { path: '/pay/prepare', component: PayPrepare, checkAuth: true },
    { path: '/pay/center', component: PayCenter, checkAuth: true },
    { path: '/pay/status', component: PayStatus, checkAuth: true },
    { path: '/pay/oversea', component: PayStripe, checkAuth: true },
];

export default routes;

import Index from './component/index.js';
import Card from "./component/card";

const routes = [
    {
        path: '/cquiz',
        component: Index,
        exact: true,
    },
    { path: '/cquiz/card', component: Card, checkAuth: true },
];

export default routes;
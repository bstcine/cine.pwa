import React from 'react';

import { CRouter } from '@/component/CRouter';
import Root from '@/entry/widget/containerRoot';
import Container from '@/entry/widget/container';
import CardContainer from '@/entry/widget/card/CardContainer';

const widgetRoute = {
    path: '/widget',
    component: Root,
    routes: [
        {
            isExact: true,
            path: '/widget',
            component: Container,
        },
        {
            path: '/widget/card',
            component: CardContainer,
        },
    ],
    checkAuth: false,
};
export const WidgetRouter = () => <CRouter route={widgetRoute} />;

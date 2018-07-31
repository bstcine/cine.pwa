import React from 'react';

import { CRouter } from '@/component/CRouter';
import Root from '@/entry/Widget/containerRoot';
import Container from '@/entry/Widget/container';
import CardContainer from '@/entry/Widget/card/CardContainer';

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
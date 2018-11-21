import React from 'react';

import { CRouter } from '@/component/CRouter';
import Root from '@/entry/widget/containerRoot';
import Container from '@/entry/widget/container';
import CardContainer from '@/entry/widget/card/CardContainer';
import SPageContainer from '@/entry/widget/csub/SPageContainer';

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
        {
            path: '/widget/csub',
            component: SPageContainer,
        },
    ],
    checkAuth: false,
};
export const WidgetRouter = () => <CRouter route={widgetRoute} />;

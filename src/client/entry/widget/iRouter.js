import { GRouter } from '@/g/component';
import React from 'react';
import WidgetExampleContainer from '@/entry/widget/container/WidgetExampleContainer';
import CardContainer from '@/entry/widget/container/CardContainer';
import SubPageContainer from '@/entry/widget/container/SubPageContainer';

const routes = [
    {
        exact: true,
        path: '/widget',
        component: WidgetExampleContainer,
    },
    {
        path: '/widget/card',
        component: CardContainer,
    },
    {
        path: '/widget/csub',
        component: SubPageContainer,
    },
    {
        path: '/widget/pwa',
        component: SubPageContainer,
    },
];

const IRouter = () => <GRouter routes={routes} />;
export default IRouter;

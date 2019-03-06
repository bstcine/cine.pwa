import WidgetExampleContainer from '@/entry/widget/container/WidgetExampleContainer';
import CardContainer from '@/entry/widget/container/CardContainer';
import SPageContainer from '@/entry/widget/container/SubPageContainer';

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
        component: SPageContainer,
    },
    {
        path: '/widget/pwa',
        component: SPageContainer,
    },
];

export default routes;
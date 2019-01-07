import Container from '@/entry/widget/container';
import CardContainer from '@/entry/widget/card/CardContainer';
import SPageContainer from '@/entry/widget/csub/SPageContainer';

const routes = [
    {
        exact: true,
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
    {
        path: '/widget/pwa',
        component: SPageContainer,
    },
];

export default routes;
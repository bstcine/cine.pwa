import React from 'react';
import { CRouter } from '@/component/CRouter';
import CSubRoot from './container/Root';
import SP_FJYDContainer from './container/SP_FJYDContainer';
import SP_ZXSSContainer from './container/SP_ZXSSContainer';
import SP_TFSATContainer from './container/SP_TFSATContainer';

const routes = {
    path: '/csub',
    component: CSubRoot,
    routes: [
        {
            path: '/csub/fjyd',
            component: SP_FJYDContainer,
        },
        {
            path: '/csub/zxss',
            component: SP_ZXSSContainer,
        },
        {
            path: '/csub/tfsat',
            component: SP_TFSATContainer,
        },
    ],
    checkAuth: false,
};
export const SubPageRouter = () => <CRouter route={routes} />;

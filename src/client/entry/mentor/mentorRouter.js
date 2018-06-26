import React from 'react';
import { CRouter } from '@/component/CRouter';
import Root from './container/root';
import StuTaskContainer from './container/sTaskContainer';
import StuQuizContainer from './container/sQuizContainer';


const routes = {
    path: '/mentor',
    component: Root,
    routes: [
        {
            isExact: true,
            path: '/mentor',
            component: StuTaskContainer,
        },
        {
            path: '/mentor/dash',
            component: StuQuizContainer,
        },
    ],
    checkAuth: true,
};
export const MentorRouter = () => <CRouter route={routes} />;
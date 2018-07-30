import React from 'react';
import { CRouter } from '@/component/CRouter';
import LearnRoot from './container/Root';
import HomePage from './container/HomePage';
import HistoryTaskContainer from './container/historyTaskContainer';

const routes = {
    path: '/learn',
    component: LearnRoot,
    routes: [
        {
            isExact: true,
            path: '/learn',
            component: HomePage,
        },
        {
            path: '/learn/task',
            component: HistoryTaskContainer,
        },
    ],
    checkAuth: true,
};
export const LearnRouter = () => <CRouter route={routes} />;

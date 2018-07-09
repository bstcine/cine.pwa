import React from 'react';
import { CRouter } from '@/component/CRouter';
import LearnRoot from './container/Root';
import HomePage from './container/HomePage';
import HistoryTaskContainer from './container/historyTaskContainer';
import WordContainer from './container/wordContainer';
import WordQuizContainer from './container/wordQuizContainer';
import Widget from './container/Widget';

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
            path: '/learn/widget',
            component: Widget,
        },
        {
            path: '/learn/word',
            component: WordContainer,
        },
        {
            path: '/learn/task',
            component: HistoryTaskContainer,
        },
        {
            path: '/learn/wordquiz',
            component: WordQuizContainer,
        },
    ],
    checkAuth: true,
};
export const LearnRouter = () => <CRouter route={routes} />;

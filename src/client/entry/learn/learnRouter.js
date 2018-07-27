import React from 'react';
import { CRouter } from '@/component/CRouter';
import LearnRoot from './container/Root';
import HomePage from './container/HomePage';
import HistoryTaskContainer from './container/historyTaskContainer';
import WordContainer from './container/WordContainer';
import WordListContainer from './container/WordListContainer';
import WordQuizContainer from './container/WordQuizContainer';
import WordCardContainer from './container/WordCardContainer';

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
        {
            path: '/learn/word',
            component: WordContainer,
        },
        {
            path: '/learn/word/list',
            component: WordListContainer,
        },
        {
            path: '/learn/word/quiz',
            component: WordQuizContainer,
        },
        {
            path: '/learn/word/card',
            component: WordCardContainer,
        },
    ],
    checkAuth: true,
};
export const LearnRouter = () => <CRouter route={routes} />;

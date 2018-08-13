import React from 'react';
import { CRouter } from '@/component/CRouter';
import WordRoot from './container/Root';
import WordContainer from './container/WordContainer';
import WordListContainer from './container/WordListContainer';
import WordQuizContainer from './container/WordQuizContainer';
import WordCardContainer from './container/WordCardContainer';
import WordCourseContainer from './container/WordCourseContainer';

const routes = {
    path: '/lword',
    component: WordRoot,
    routes: [
        {
            path: '/lword/course',
            component: WordCourseContainer,
        },
        {
            isExact: true,
            path: '/lword',
            component: WordContainer,
        },
        {
            path: '/lword/list',
            component: WordListContainer,
        },
        {
            path: '/lword/quiz',
            component: WordQuizContainer,
        },
        {
            path: '/lword/card',
            component: WordCardContainer,
        },
    ],
    checkAuth: true,
};
export const WordRouter = () => <CRouter route={routes} />;

import React from 'react';
import { CRouter } from '@/component/CRouter';
import * as h5 from '@/constant/menuItemUrl';
import Root from './container/root';
import StuTaskContainer from './container/stuTaskContainer';
import stuQuizContainer from './container/stuQuizContainer';
import stuCorrectContainer from './container/stuCorrectContainer';

const routes = {
    path: '/mentor',
    component: Root,
    routes: [
        {
            isExact: true,
            path: h5.URL_Mentor_Index,
            component: StuTaskContainer,
        },
        {
            path: h5.URL_Mentor_Student_Task,
            component: StuTaskContainer,
        },
        {
            path: h5.URL_Mentor_Student_Quiz,
            component: stuQuizContainer,
        },
        {
            path: h5.URL_Mentor_CorrectList,
            component: stuCorrectContainer,
        },
    ],
    checkAuth: true,
};
export const MentorRouter = () => <CRouter route={routes} />;

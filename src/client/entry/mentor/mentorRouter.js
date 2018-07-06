import React from 'react';
import { CRouter } from '@/component/CRouter';
import * as h5 from '@/constant/menuItemUrl';
import Root from './container/root';
import stuTaskContainer from './container/stuTaskContainer';
import stuQuizContainer from './container/stuQuizContainer';
import stuCorrectContainer from './container/stuCorrectContainer';

const routes = {
    path: h5.URL_Mentor_Index,
    component: Root,
    routes: [
        {
            path: h5.URL_Mentor_Student_Task,
            component: stuTaskContainer,
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

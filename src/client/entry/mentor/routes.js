import * as h5 from '@/constant/menuItemUrl';
import stuTaskContainer from './container/stuTaskContainer';
import stuQuizContainer from './container/stuQuizContainer';
import stuCorrectContainer from './container/stuCorrectContainer';

const routes = [
    {
        path: h5.URL_Mentor_Index,
        component: () => {
            location.href = h5.URL_Mentor_Student_Task;
        },
        checkAuth: true,
        exact: true,
    },
    {
        path: h5.URL_Mentor_Student_Task,
        component: stuTaskContainer,
        checkAuth: true,
    },
    {
        path: h5.URL_Mentor_Student_Quiz,
        component: stuQuizContainer,
        checkAuth: true,
    },
    {
        path: h5.URL_Mentor_CorrectList,
        component: stuCorrectContainer,
        checkAuth: true,
    },
];

export default routes;

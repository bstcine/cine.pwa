import * as h5 from '@/constant/menuItemUrl';
import QuizPage from '@/entry/quiz/container/QuizPage';

const routes = [
    {
        exact: true,
        path: h5.URL_Quiz_Index,
        component: QuizPage,
        checkAuth: true,
    },
    {
        path: h5.URL_Quiz_Kj,
        component: QuizPage,
        checkAuth: true,
    },
    {
        path: h5.URL_Quiz_Grammar,
        component: QuizPage,
        checkAuth: true,
    },
];

export default routes;

import WordContainer from './container/WordContainer';
import WordListContainer from './container/WordListContainer';
import WordQuizContainer from './container/WordQuizContainer';
import WordCardContainer from './container/WordCardContainer';
import WordCourseContainer from './container/WordCourseContainer';

const routes = [
    {
        exact: true,
        path: '/lword',
        component: WordContainer,
        checkAuth: true,
    },
    {
        path: '/lword/course',
        component: WordCourseContainer,
        checkAuth: true,
    },
    {
        path: '/lword/list',
        component: WordListContainer,
        checkAuth: true,
    },
    {
        path: '/lword/quiz',
        component: WordQuizContainer,
        checkAuth: true,
    },
    {
        path: '/lword/card',
        component: WordCardContainer,
        checkAuth: true,
    },
];

export default routes;

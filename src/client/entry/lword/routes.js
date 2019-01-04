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
    },
    {
        path: '/lword/course',
        component: WordCourseContainer,
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
];

export default routes;

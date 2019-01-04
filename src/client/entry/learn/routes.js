import {
    URL_Learn_Achieve,
    URL_Learn_Course,
    URL_Learn_Index,
    URL_Learn_Task,
} from '@/constant/menuItemUrl';
import HomePage from '@/entry/learn/container/HomePage';
import HistoryTaskPage from '@/entry/learn/container/HistoryTaskPage';
import CoursePage from '@/entry/learn/container/CoursePage';
import { chunkComponent } from '@/util/chunkComponent';
const AchievePage = chunkComponent(() =>
    import(/* webpackChunkName: "learn/chunk/index.ap" */ './container/AchievePage')
);

const routes = [
    {
        path: URL_Learn_Index,
        component: HomePage,
        exact: true,
        checkAuth: true,
    },
    { path: URL_Learn_Task, component: HistoryTaskPage, checkAuth: true },
    { path: URL_Learn_Course, component: CoursePage, checkAuth: true },
    { path: URL_Learn_Achieve, component: AchievePage, checkAuth: false },
];

export default routes;

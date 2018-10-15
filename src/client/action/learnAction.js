import { fetchData } from '@/service/base';
import {
    APIURL_User_Content_Task_Current,
    APIURL_User_Content_Course_Mylist,
    APIURL_Content_Chapter_List,
    APIURL_Content_Lesson_Detail,
    APIURL_Content_Task_Share,
} from '@/../APIConfig';
import {
    REQUEST_CURRENT_TASK,
    RECEIVE_CURRENT_TASK,
    REQUEST_MY_COURSE_LIST,
    RECEIVE_MY_COURSE_LIST,
    RECIVE_LESSON_TREE,
    RECIVE_LESSON_DETAIL,
    RECIVE_TASK_SHARE,
} from '@/constant/actionTypeLearn';
import { superFetchDataWithShowLogin } from '@/action/commonAction';

export const fetchCurrentTask = () => async dispatch => {
    dispatch(requsetCurrentTask());
    let [, result] = await fetchData(
        APIURL_User_Content_Task_Current,
        null,
        'GET'
    );
    dispatch(recieveCurrentTask({ tasks: result }));
};

export const requsetCurrentTask = () => {
    return {
        type: REQUEST_CURRENT_TASK,
    };
};

export const recieveCurrentTask = ({ tasks }) => {
    return {
        type: RECEIVE_CURRENT_TASK,
        payload: {
            tasks,
        },
    };
};

export const fetchMyCourseList = () => async dispatch => {
    dispatch(requsetMyCourseList());
    let [, result] = await fetchData(
        APIURL_User_Content_Course_Mylist,
        null,
        'GET'
    );
    dispatch(recieveMyCourseList({ courses: result.rows }));
};

export const requsetMyCourseList = () => {
    return {
        type: REQUEST_MY_COURSE_LIST,
    };
};

export const recieveMyCourseList = ({ courses }) => {
    return {
        type: RECEIVE_MY_COURSE_LIST,
        payload: {
            courses,
        },
    };
};

export const fetchLessonTree = ({ course_id }) => async dispatch => {
    let [err, result] = await dispatch(
        superFetchDataWithShowLogin(APIURL_Content_Chapter_List, {
            cid: course_id,
        })
    );
    if (err) return;
    dispatch(reciveLessonTree({ tree: result.rows }));
};

export const reciveLessonTree = ({ tree }) => {
    return {
        type: RECIVE_LESSON_TREE,
        payload: {
            tree,
        },
    };
};

export const fetchLessonDetail = ({ lessonId }) => async dispatch => {
    let [err, result] = await dispatch(
        superFetchDataWithShowLogin(APIURL_Content_Lesson_Detail, {
            cid: lessonId,
        })
    );
    if (err) return;
    dispatch(reciveLessonDetail(result.detail));
};

export const reciveLessonDetail = detail => {
    return {
        type: RECIVE_LESSON_DETAIL,
        payload: detail,
    };
};

export const fetchTaskShare = ({ user_id }) => async dispatch => {
    let [err, result] = await dispatch(
        superFetchDataWithShowLogin(APIURL_Content_Task_Share, {
            user_id,
        })
    );
    if (err) return;

    dispatch(reciveTaskShare(result));
};

export const reciveTaskShare = detail => {
    return {
        type: RECIVE_TASK_SHARE,
        payload: detail,
    };
};

import { fetchData } from '@/service/base';
import {
    APIURL_User_Content_Task_Current,
    APIURL_User_Content_Course_Mylist,
    APIURL_Content_Chapter_List,
} from '@/../APIConfig';
import {
    REQUEST_CURRENT_TASK,
    RECEIVE_CURRENT_TASK,
    REQUEST_MY_COURSE_LIST,
    RECEIVE_MY_COURSE_LIST,
    RECIVE_LESSON_TREE,
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

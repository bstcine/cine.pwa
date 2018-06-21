import { fetchData } from '@/service/base';
import {
    APIURL_User_Content_Task_Current,
    APIURL_User_Content_Course_Mylist,
} from '@/../APIConfig';
import {
    REQUEST_CURRENT_TASK,
    RECEIVE_CURRENT_TASK,
    REQUEST_MY_COURSE_LIST,
    RECEIVE_MY_COURSE_LIST,
} from '@/constant/actionTypeLearn';

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

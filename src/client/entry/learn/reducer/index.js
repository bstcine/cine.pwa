import { combineReducers } from 'redux';
import TaskRedu from './TaskReducer';
import courseRedu from './courseReducer';
import gReducer from '@/g/reducer';
import {
    RECEIVE_CURRENT_TASK,
    RECEIVE_MY_COURSE_LIST,
    RECIVE_TASK_SHARE,
} from '@/constant/actionTypeLearn';

const currentTasks = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_CURRENT_TASK:
            return action.payload.tasks;
        default:
            return state;
    }
};

const courses = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_MY_COURSE_LIST:
            return action.payload.courses;
        default:
            return state;
    }
};

const taskShareRedu = (state = null, action) => {
    switch (action.type) {
        case RECIVE_TASK_SHARE:
            return { ...action.payload };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    currentTasks,
    courses,
    TaskRedu,
    taskShareRedu,
    ...courseRedu,
    ...gReducer,
});

export default rootReducer;

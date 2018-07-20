import { combineReducers } from 'redux';
import WordRedu from './WordReducer';
import WordQuizRedu from './WordQuizReducer';
import TaskRedu from './TaskReducer';
// import { userRedu, toastRedu } from '@/reducer';
import gReducer from '@/g/reducer';
import {
    RECEIVE_CURRENT_TASK,
    RECEIVE_MY_COURSE_LIST,
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

const rootReducer = combineReducers({
    // userRedu,
    currentTasks,
    courses,
    WordRedu,
    TaskRedu,
    WordQuizRedu,
    // toastRedu,
    ...gReducer,
});

export default rootReducer;

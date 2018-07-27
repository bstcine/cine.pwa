import { combineReducers } from 'redux';
import WordRedu from './WordRedu';
import WordListRedu from './WordListReducer';
import WordQuizRedu from './WordQuizReducer';
import TaskRedu from './TaskReducer';
import WordCardRedu from './WordCardReducer';
import { userRedu, toastRedu } from '@/reducer';
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
    userRedu,
    currentTasks,
    courses,
    WordRedu,
    WordListRedu,
    TaskRedu,
    WordQuizRedu,
    toastRedu,
    WordCardRedu,
});

export default rootReducer;

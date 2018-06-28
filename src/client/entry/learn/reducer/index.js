import { combineReducers } from 'redux';
import vocabularyRedu from './vocabularyTaskReducer';
import historyTaskRedu from './historyTaskReducer';
import vocabularyTestRedu from './vocabularyTestReducer';
import { user } from '@/reducer';
import {
    RECEIVE_CURRENT_TASK,
    RECEIVE_MY_COURSE_LIST,
} from '@/constant/actionTypeLearn';
import { toastRedu } from '@/reducer';

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
    user,
    currentTasks,
    courses,
    vocabularyRedu,
    historyTaskRedu,
    vocabularyTestRedu,
    toastRedu,
});

export default rootReducer;

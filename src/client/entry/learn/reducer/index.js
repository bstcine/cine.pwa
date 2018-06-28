import { combineReducers } from 'redux';
import vocabularyRedu from './vocabularyTaskReducer';
import historyTaskRedu from './historyTaskReducer';
import vocabularyTestRedu from './vocabularyTestReducer';
import { userRedu } from '@/reducer';
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
    vocabularyRedu,
    historyTaskRedu,
    vocabularyTestRedu,
});

export default rootReducer;

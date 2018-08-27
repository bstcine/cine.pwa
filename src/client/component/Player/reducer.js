import { combineReducers } from 'redux';

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
    currentTasks,
    courses,
});

export default rootReducer;

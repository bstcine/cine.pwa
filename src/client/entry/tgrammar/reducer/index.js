import {combineReducers} from 'redux';

import {REQUEST_DATA, RECEIVE_DATA, ON_QUESTION3_SELECT_CHANGE} from '../action';

const quiz = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_DATA:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_DATA:
            return {
                ...state,
                name: action.name,
                count: action.count,
                questions: action.questions,
                isFetching: false
            };
        default:
            return state;
    }
};

/**
 *  questionId 为 key 的 answers 对象
 * @param {*} state
 * @param {*} action
 */
const answersById = (state = {}, action) => {
    switch (action.type) {
        case ON_QUESTION3_SELECT_CHANGE:
            return {...state, [action.questionId]: {selectValue: action.selectValue}};
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    quiz,
    answersById
});

export default rootReducer;
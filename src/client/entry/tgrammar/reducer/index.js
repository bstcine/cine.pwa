import {combineReducers} from 'redux';

import {REQUEST_DATA, RECEIVE_DATA} from '../action';

const getData = (state = {}, action) => {
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
                questionItems: action.questionItems,
                isFetching: false
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    quiz: getData
});

export default rootReducer;
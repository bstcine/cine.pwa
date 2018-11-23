import { combineReducers } from 'redux';
import { fromJS } from 'immutable';
import * as actionType from '@/constant/actionType';

const initialState = fromJS({
    course: [],
    teacher: [],
    comment: [],
    article: [],
    resource: [],
});

const spageRedu = (state = initialState, action) => {
    switch (action.type) {
        case actionType.Http_Receive: {
            return fromJS(action.payload);
        }

        default:
            return state;
    }
};

const rootReducer = combineReducers({
    spageRedu,
});

export default rootReducer;

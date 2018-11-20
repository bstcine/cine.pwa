import { combineReducers } from 'redux';
import { fromJS } from 'immutable';
import * as sub from '@/service/data/response_subpage.json';

const initialState = fromJS({
    course: sub.result.course,
    teacher: sub.result.teacher,
    comment: sub.result.comment,
    article: sub.result.article,
    resource: sub.result.resource    
});

const spageRedu = (state = initialState, action) => {
    switch (action.type) {
        /*         case Action_UC.RECEIVE:
            return state.set('orders', action.payload); */
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    spageRedu,
});

export default rootReducer;

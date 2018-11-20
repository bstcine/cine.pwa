import { fromJS } from 'immutable';
import * as sub from '@/service/data/response_subpage.json';

const initialState = fromJS({
    course: sub.result.course,
    teacher: sub.result.teacher,
    article: sub.result.article,
    comment: sub.result.comment,
});

const spageRedu = (state = initialState, action) => {
    switch (action.type) {
        /*         case Action_UC.RECEIVE:
            return state.set('orders', action.payload); */
        default:
            return state;
    }
};

export default spageRedu;

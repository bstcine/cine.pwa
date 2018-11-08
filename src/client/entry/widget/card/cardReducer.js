import { fromJS } from 'immutable';
import * as card from '@/service/data/response_card.json';
import * as sub from '@/service/data/response_subpage.json';

const initialState = fromJS({
    order: card.result,
    course: sub.result.course,
    teacher: sub.result.teacher,
    isOpenDetail: false,
});

const cardRedu = (state = initialState, action) => {
    switch (action.type) {
        /*         case Action_UC.RECEIVE:
            return state.set('orders', action.payload); */
        default:
            return state;
    }
};

export default cardRedu;

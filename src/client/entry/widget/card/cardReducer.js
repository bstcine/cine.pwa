import { fromJS } from 'immutable';
import * as order from '@/service/data/response_card.json';

const initialState = fromJS({
    orders: order.result,
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

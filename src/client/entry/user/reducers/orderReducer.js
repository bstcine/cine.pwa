import { fromJS } from 'immutable';

const initialState = fromJS({
    orders: [
        {
            id: 0,
            weight: 233,
            isEaten: false,
        },
        {
            weight: 235,
            id: 1,
            isEaten: false,
        },
        {
            weight: 256,
            isEaten: false,
            id: 2,
        },
    ],
    isOpenDetail: false,
});

const orderRedu = (state = initialState, action) => {
    switch (action.type) {
        /*         case Action_UC.RECEIVE:
            return state.set('orders', action.payload); */
        default:
            return state;
    }
};

export default orderRedu;

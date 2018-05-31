import { fromJS } from 'immutable';
import { Action_UC } from '@/constant/actionTypeUser';

const initialState = fromJS({
    rows: [],
    isOpenAdd: false,
    transfer: {
        isOpen: false,
        coupon: null,
    },
});

const couponRedu = (state = initialState, action) => {
    switch (action.type) {
        case Action_UC.RECEIVE:
            return state.set('rows', action.payload);
        case Action_UC.TOGGLE_DIALOG:
            return state.set('isOpenAdd', action.payload);
        case Action_UC.EXPAND:
            return state.set('rows', action.payload);

        default:
            return state;
    }
};

export default couponRedu;

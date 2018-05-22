import { fromJS } from 'immutable';
import { Action_UC } from '@/constant/actionTypeUser';

const initialState = fromJS({
    rows: [],
    isOpen: false,
    network: { loading: false, msg: '', error: '' },
});

const couponRedu = (state = initialState, action) => {
    switch (action.type) {
        case Action_UC.RECEIVE:
            return state.set('rows', action.payload);
        case Action_UC.TOGGLE_DIALOG:
            return state.set('isOpen', action.payload);
        case Action_UC.EXPAND:
            return state.set('rows', action.payload);

        case Action_UC.ADD_COUPON_START: {
            let toastStatus = { loading: true, msg: '', error: '' };
            return state.set('network', toastStatus);
        }
        case Action_UC.ADD_COUPON_END: {
            let toastStatus = {
                loading: false,
                msg: '添加成功',
                error: action.payload,
            };
            return state.set('network', toastStatus);
        }
        case Action_UC.TOAST_HIDE: {
            let toastStatus = { loading: false, msg: '', error: '' };
            return state.set('network', toastStatus);
        }

        default:
            return state;
    }
};

export default couponRedu;

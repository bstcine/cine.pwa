import { combineReducers } from 'redux';
import { Action_UI, Action_UC, Action_UP } from '@/constant/actionTypeUser';

const user = (
    state = {
        nickname: '',
        role_id: '1',
        phone: '',
        point: 0,
        unuseCouponsCount: 0,
        unpayOrdersCount: 0,
    },
    action
) => {
    switch (action.type) {
        case Action_UI.RECEIVE:
            return action.payload;
        default:
            return state;
    }
};

const coupons = (
    state = {
        rows: [],
        isOpen: false,
        network: { loading: false, msg: '', error: '' },
    },
    action
) => {
    switch (action.type) {
        case Action_UC.RECEIVE:
            return { ...state, rows: action.payload };
        case Action_UC.EXPAND:
            return {
                ...state,
                rows: state.rows.map(item => ({
                    ...item,
                    expand: item.id === action.id ? !item.expand : item.expand,
                })),
            };
        case Action_UC.DIALOG_ADD:
            return { ...state, isOpen: !state.isOpen };
        case Action_UC.REQUEST_ADD:
            return { ...state, network: { loading: true, msg: '', error: '' }};
        case Action_UC.RECEIVE_ADD:
            return {
                ...state,
                network: { loading: false, msg: '添加成功', error: action.err },
            };
        case Action_UC.TOAST_HIDE:
            return { ...state, network: { loading: false, msg: '', error: '' }};
        default:
            return state;
    }
};

const points = (state = { rows: [], remark: '' }, action) => {
    switch (action.type) {
        case Action_UP.RECEIVE:
            return action.payload;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    user,
    coupons,
    points,
});

export default rootReducer;

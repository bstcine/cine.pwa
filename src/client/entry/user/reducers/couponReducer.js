import { Action_UC } from '@/constant/actionTypeUser';
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
        case Action_UC.TOGGLE_DIALOG:
            return { ...state, isOpen: !state.isOpen };
        case Action_UC.ADD_COUPON_START:
            return { ...state, network: { loading: true, msg: '', error: '' }};
        case Action_UC.ADD_COUPON_END:
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

export default coupons;

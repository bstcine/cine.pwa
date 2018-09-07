import * as actionType from '../constant';

const userRedu = (state = { loading: false, data: null }, action) => {
    switch (action.type) {
        case actionType.REQUEST_USER_INFO:
            return { loading: true, ...state };
        case actionType.RECEIVE_USER_INFO:
            return { loading: false, data: action.payload };
        default:
            return state;
    }
};
export default {
    userRedu,
};

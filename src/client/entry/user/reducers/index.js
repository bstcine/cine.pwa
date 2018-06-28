import { combineReducers } from 'redux';
import couponRedu from './couponReducer';
import points from './pointReducer';
// import { Action_UI } from '@/constant/actionTypeUser';
import { toastRedu, userRedu } from '@/reducer';
// const user = (
//     state = {
//         nickname: '',
//         role_id: '3',
//         phone: '',
//         point: 0,
//         unuseCouponsCount: 0,
//         unpayOrdersCount: 0,
//     },
//     action
// ) => {
//     switch (action.type) {
//         case Action_UI.RECEIVE:
//             return action.payload;
//         default:
//             return state;
//     }
// };

const rootReducer = combineReducers({
    userRedu,
    couponRedu,
    points,
    toastRedu,
});

export default rootReducer;

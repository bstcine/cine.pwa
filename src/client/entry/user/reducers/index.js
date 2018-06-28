import { combineReducers } from 'redux';
import couponRedu from './couponReducer';
import points from './pointReducer';
import { toastRedu, userRedu } from '@/reducer';

const rootReducer = combineReducers({
    userRedu,
    couponRedu,
    points,
    toastRedu,
});

export default rootReducer;

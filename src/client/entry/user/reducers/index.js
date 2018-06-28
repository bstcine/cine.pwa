import { combineReducers } from 'redux';
import couponRedu from './couponReducer';
import points from './pointReducer';
import { toastRedu, user } from '@/reducer';

const rootReducer = combineReducers({
    user,
    couponRedu,
    points,
    toastRedu,
});

export default rootReducer;

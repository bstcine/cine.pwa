import { combineReducers } from 'redux';
import couponRedu from './couponReducer';
import points from './pointReducer';
import stats from './quizReducer';
import { toastRedu, userRedu } from '@/reducer';

const rootReducer = combineReducers({
    userRedu,
    couponRedu,
    points,
    toastRedu,
    stats,
});

export default rootReducer;

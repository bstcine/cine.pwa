import { combineReducers } from 'redux';
import couponRedu from './couponReducer';
import orderRedu from './orderReducer';
import points from './pointReducer';
import stats from './quizReducer';
import gReducer from '@/g/reducer';

const rootReducer = combineReducers({
    // userRedu,
    couponRedu,
    orderRedu,
    points,
    // toastRedu,
    stats,
    ...gReducer,
});

export default rootReducer;

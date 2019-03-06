import { combineReducers } from 'redux';
import gReducer from '@/g/reducer';
import cardRedu from './cardReducer';
import subPageRedu from './subPageReducer';

const rootReducer = combineReducers({
    cardRedu,
    subPageRedu,
    ...gReducer,
});

export default rootReducer;

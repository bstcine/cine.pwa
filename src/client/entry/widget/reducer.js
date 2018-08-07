import { combineReducers } from 'redux';
import gReducer from '@/g/reducer';
import cardRedu from './card/cardReducer';

const rootReducer = combineReducers({
    cardRedu,
    ...gReducer,
});

export default rootReducer;

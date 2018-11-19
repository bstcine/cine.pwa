import { combineReducers } from 'redux';
import gReducer from '@/g/reducer';
import cardRedu from './card/cardReducer';
import spageRedu from './subpage/spageReducer';

const rootReducer = combineReducers({
    cardRedu,
    spageRedu,
    ...gReducer,
});

export default rootReducer;

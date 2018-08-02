import { combineReducers } from 'redux';
import WordRedu from './WordRedu';
import WordQuizRedu from './WordQuizReducer';
import WordCardRedu from './WordCardReducer';
import gReducer from '@/g/reducer';

const rootReducer = combineReducers({
    WordRedu,
    WordQuizRedu,
    WordCardRedu,
    ...gReducer,
});

export default rootReducer;

import { combineReducers } from 'redux';
import WordRedu from './WordRedu';
import WordListRedu from './WordListReducer';
import WordQuizRedu from './WordQuizReducer';
import WordCardRedu from './WordCardReducer';
import gReducer from '@/g/reducer';

const rootReducer = combineReducers({
    WordRedu,
    WordListRedu,
    WordQuizRedu,
    WordCardRedu,
    ...gReducer,
});

export default rootReducer;

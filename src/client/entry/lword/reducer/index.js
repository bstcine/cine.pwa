import { combineReducers } from 'redux';
import WordRedu from './WordRedu';
import WordQuizRedu from './WordQuizReducer';
import WordCardRedu from './WordCardReducer';
import WordCourseRedu from './wordCourseRedu';
import gReducer from '@/g/reducer';

const rootReducer = combineReducers({
    WordCourseRedu,
    WordRedu,
    WordQuizRedu,
    WordCardRedu,
    ...gReducer,
});

export default rootReducer;

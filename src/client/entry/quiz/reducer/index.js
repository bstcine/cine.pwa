import { combineReducers } from 'redux';
import gReducer from '@/g/reducer';
import {
    quiz,
    statsContentQuiz,
    questions,
    answersById,
    questionsFilter,
    currentQuizState,
    taskScheduleId,
    loginModal,
    timer,
} from './quizDetailReducer';

const rootReducer = combineReducers({
    quiz,
    statsContentQuiz,
    questions,
    answersById,
    questionsFilter,
    currentQuizState,
    taskScheduleId,
    loginModal,
    timer,
    ...gReducer,
});

export default rootReducer;

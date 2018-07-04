import { combineReducers } from 'redux';
import { alertModal, confirmModal } from '@/reducer/index';
import { userRedu } from '@/reducer';
import {
    quiz,
    statsContentQuiz,
    questions,
    answersById,
    questionsFilter,
    currentQuizState,
    taskScheduleId,
    network,
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
    userRedu,
    network,
    loginModal,
    timer,
    alertModal,
    confirmModal,
});

export default rootReducer;

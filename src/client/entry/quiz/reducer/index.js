import { combineReducers } from 'redux';
import { alertModal, confirmModal } from '@/reducer/index';
import {
    quiz,
    statsContentQuiz,
    statsContentStuQuizWordList,
    questions,
    answersById,
    questionsFilter,
    currentQuizState,
    user,
    network,
    loginModal,
    timer,
} from './quizDetailReducer';

const rootReducer = combineReducers({
    quiz,
    statsContentQuiz,
    questions,
    statsContentStuQuizWordList,
    answersById,
    questionsFilter,
    currentQuizState,
    user,
    network,
    loginModal,
    timer,
    alertModal,
    confirmModal,
});

export default rootReducer;

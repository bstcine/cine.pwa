import { combineReducers } from 'redux';
import { alertModal, confirmModal, user } from '@/reducer/index';

import {
    quiz,
    statsContentQuiz,
    statsContentStuQuizWordList,
    questions,
    answersById,
    questionsFilter,
    currentQuizState,
    network,
    loginModal,
    timer,
} from '@/entry/quiz/reducer/quizDetailReducer';

const rootReducer = combineReducers({
    quiz,
    statsContentQuiz,
    questions,
    statsContentStuQuizWordList,
    answersById,
    questionsFilter,
    currentQuizState,
    network,
    loginModal,
    timer,
    alertModal,
    confirmModal,
    user
});

export default rootReducer;
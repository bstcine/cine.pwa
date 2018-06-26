import { combineReducers } from 'redux';
import { alertModal, confirmModal, user } from '@/reducer/index';

import {
    statsContentQuiz,
    statsContentStuQuizWordList,
    network,
} from '@/entry/quiz/reducer/stuQuizReducer';

const rootReducer = combineReducers({
    statsContentQuiz,
    statsContentStuQuizWordList,
    network,

    alertModal,
    confirmModal,
    user,
});

export default rootReducer;

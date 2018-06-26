import { combineReducers } from 'redux';
import { alertModal, confirmModal, user } from '@/reducer/index';

import {
    stuQuizGrammarAndWordList,
    network,
} from '@/entry/quiz/reducer/stuQuizReducer';

const rootReducer = combineReducers({
    stuQuizGrammarAndWordList,
    network,

    alertModal,
    confirmModal,
    user,
});

export default rootReducer;

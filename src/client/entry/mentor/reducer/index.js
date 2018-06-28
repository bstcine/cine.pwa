import { combineReducers } from 'redux';
import { alertModal, confirmModal, userRedu } from '@/reducer/index';

import { stuQuizGrammarAndWordList, network } from './stuQuizReducer';

const rootReducer = combineReducers({
    stuQuizGrammarAndWordList,
    network,

    alertModal,
    confirmModal,
    userRedu,
});

export default rootReducer;

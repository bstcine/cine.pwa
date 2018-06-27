import { combineReducers } from 'redux';
import { alertModal, confirmModal, user } from '@/reducer/index';

import { stuQuizGrammarAndWordList, network } from './stuQuizReducer';

const rootReducer = combineReducers({
    stuQuizGrammarAndWordList,
    network,

    alertModal,
    confirmModal,
    user,
});

export default rootReducer;

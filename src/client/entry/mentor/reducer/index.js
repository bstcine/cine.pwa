import { combineReducers } from 'redux';
import {
    alertModal,
    confirmModal,
    userRedu,
    networkFetchStatus,
} from '@/reducer/index';

import { stuQuizGrammarAndWordList, network } from './stuQuizReducer';
import { mentorStudentTask } from './stuTaskReducer';

const rootReducer = combineReducers({
    stuQuizGrammarAndWordList,
    network,

    mentorStudentTask,

    alertModal,
    confirmModal,
    userRedu,
    networkFetchStatus,
});

export default rootReducer;

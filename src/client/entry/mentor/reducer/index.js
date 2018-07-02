import { combineReducers } from 'redux';
import { alertModal, confirmModal, userRedu, networks } from '@/reducer/index';

import { mentorStudentQuizWord } from './stuQuizReducer';
import { mentorStudentTask } from './stuTaskReducer';

const rootReducer = combineReducers({
    mentorStudentQuizWord,
    mentorStudentTask,

    alertModal,
    confirmModal,
    userRedu,
    networks,
});

export default rootReducer;

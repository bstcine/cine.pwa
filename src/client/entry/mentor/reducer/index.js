import { combineReducers } from 'redux';
import { confirmModal, userRedu, toastRedu } from '@/reducer/index';

import { mentorStudentQuizWord } from './stuQuizReducer';
import { mentorStudentTask } from './stuTaskReducer';

const rootReducer = combineReducers({
    mentorStudentQuizWord,
    mentorStudentTask,

    confirmModal,
    userRedu,
    toastRedu,
});

export default rootReducer;

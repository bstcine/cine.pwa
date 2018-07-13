import { combineReducers } from 'redux';
import {
    alertModal,
    confirmModal,
    userRedu,
    networkModal,
} from '@/reducer/index';

import { mentorStudentQuizWord } from './stuQuizReducer';
import { mentorStudentTask } from './stuTaskReducer';

const rootReducer = combineReducers({
    mentorStudentQuizWord,
    mentorStudentTask,

    alertModal,
    confirmModal,
    userRedu,
    networkModal,
});

export default rootReducer;

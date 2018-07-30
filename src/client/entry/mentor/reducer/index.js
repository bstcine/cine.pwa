import { combineReducers } from 'redux';
import gReducer from '@/g/reducer';

import { mentorStudentQuizWord } from './stuQuizReducer';
import { mentorStudentTask } from './stuTaskReducer';

const rootReducer = combineReducers({
    mentorStudentQuizWord,
    mentorStudentTask,
    ...gReducer,
});

export default rootReducer;

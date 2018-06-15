import { combineReducers } from 'redux';
import vocabularyRedu from './vocabularyTaskReducer';
import historyTaskRedu from './historyTaskReducer';
import vocabularyTestRedu from './vocabularyTestReducer';
import { userInfo } from '@/reducer';

const rootReducer = combineReducers({
    userInfo,
    vocabularyRedu,
    historyTaskRedu,
    vocabularyTestRedu,
});

export default rootReducer;

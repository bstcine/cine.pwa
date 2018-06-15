import { combineReducers } from 'redux';
import vocabularyRedu from './vocabularyTaskReducer';
import historyTaskRedu from './historyTaskReducer'
import { userInfo } from '@/reducer';

const rootReducer = combineReducers({
    userInfo,
    vocabularyRedu,
    historyTaskRedu,
});

export default rootReducer;

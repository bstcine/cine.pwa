import { combineReducers } from 'redux';
import vocabularyRedu from './vocabularyTaskReducer';
import { userInfo } from '@/reducer';

const rootReducer = combineReducers({
    userInfo,
    vocabularyRedu,
});

export default rootReducer;

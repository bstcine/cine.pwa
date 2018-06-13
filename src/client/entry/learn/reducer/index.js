import { combineReducers } from 'redux';
import vocabularyRedu from './vocabularyTaskReducer';
import { Action_UI } from '@/constant/actionTypeUser';
import { toastRedu } from '@/reducer';

const rootReducer = combineReducers({
    vocabularyRedu,
});

export default rootReducer;
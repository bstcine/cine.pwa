import { combineReducers } from 'redux';
import * as gReducer from '@/reducer';

const rootReducer = combineReducers({
    ...gReducer,
});

export default rootReducer;

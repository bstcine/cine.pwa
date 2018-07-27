import { combineReducers } from 'redux';
import gReducer from '@/g/reducer';

const rootReducer = combineReducers({
    ...gReducer,
});

export default rootReducer;

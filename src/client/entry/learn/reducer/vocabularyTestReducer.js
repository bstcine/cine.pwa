/**
 * Created by lidangkun on 2018/6/15.
 */
import { fromJS } from 'immutable';
import { ACTION_LT } from '@/constant/actionTypeLearn';

const initialState = fromJS({
    rows: [],
});

const vocabularyTestRedu = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_LT.REQUEST:
            return state;
        case ACTION_LT.RECEIVE:
            return state.set('rows', action.payload);
        default:
            return state;
    }
};

export default vocabularyTestRedu;
/**
 * Created by lidangkun on 2018/6/15.
 */
import { fromJS } from 'immutable';
import { ACTION_LT } from '@/constant/actionTypeLearn';

const initialState = fromJS({
    isTest: false,
    content: {
        index: -1,
        wordCount: 0,
        correctCount: 0,
        value: 'wordTest',
        real_zh: -1,
        zh: [],
    },
    rows: [],
});

const vocabularyTestRedu = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_LT.REQUEST:
            return state;
        case ACTION_LT.RECEIVE:
            return state.set('rows', action.payload);
        case ACTION_LT.STARTTEST:
            return state.set('isTest', action.payload);
        case ACTION_LT.CHANGECONTENT:
            return state.set('content', action.payload);
        default:
            return state;
    }
};

export default vocabularyTestRedu;
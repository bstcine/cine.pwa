/**
 * Created by lidangkun on 2018/7/26.
 */

import { fromJS } from 'immutable';
import { ACTION_WC } from '@/constant/actionTypeLearn';

const initWordCard = fromJS({
    result: {
        name: '',
        status: 0,
        rows: null,
    },
    isAutoChangeWord: false,
    isReviseChangeWord: false,
    autoChangeTime: 3,
});

const WordCardRedu = (state = initWordCard, action) => {
    // 卡片式学习池子
    switch (action.type) {
        case ACTION_WC.REQUEST:
            return state;
        case ACTION_WC.RECEIVE:
            return state.set('result', action.payload);
        case ACTION_WC.AUTOCHANGEWORDSTATUS:
            return state.set('isAutoChangeWord', action.payload);
        case ACTION_WC.REVISECHANGEWORDSTATUS:
            return state.set('isReviseChangeWord', action.payload);
        case ACTION_WC.AUTOCHANGETIME:
            return state.set('autoChangeTime', action.payload);
        default:
            return state;
    }
};

export default WordCardRedu;
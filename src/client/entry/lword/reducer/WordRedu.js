/**
 * Created by lidangkun on 2018/7/26.
 */
import { fromJS } from 'immutable';
import { ACTION_LW } from '@/constant/actionTypeLearn';

const initWordCard = fromJS({
    result: {
        name: '',
        status: 0,
        rows: null,
    },
});

const WordRedu = (state = initWordCard, action) => {
    // 卡片式学习池子
    switch (action.type) {
        case ACTION_LW.REQUEST:
            return state;
        case ACTION_LW.RECEIVE:
            return state.set('result', action.payload);
        default:
            return state;
    }
};

export default WordRedu;
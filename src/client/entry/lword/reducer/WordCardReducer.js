/**
 * Created by lidangkun on 2018/7/26.
 */

import { fromJS } from 'immutable';

const initWordCard = fromJS({
    card: '卡片式学习',
});

const WordCardRedu = (state = initWordCard, action) => {
    // 卡片式学习池子
    return state;
};

export default WordCardRedu;
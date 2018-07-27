/**
 * Created by lidangkun on 2018/7/26.
 */
import { fromJS } from 'immutable';

const initWordCard = fromJS({
    word: '词汇任务',
});

const WordRedu = (state = initWordCard, action) => {
    // 卡片式学习池子
    return state;
};

export default WordRedu;
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
    lastZh: '',
    originRows: null,
    currentIndex: 0,
    isAutoChangeWord: false,
    autoChangeTime: 5,
    isReviseChangeWord: false,
    reviseIndexArray: null,
    reviseCurrentIndex: 0,
    timer: null,
    toggleTimer: null,
    isBack: false,
    isKnown: false,
    player: new Audio(),
});

const WordCardRedu = (state = initWordCard, action) => {
    // 卡片式学习池子
    switch (action.type) {
        case ACTION_WC.REQUEST:
            return state;
        case ACTION_WC.RECEIVE:
            return state.set('result', action.payload);
        case ACTION_WC.CHANGELASTZH:
            return state.set('lastZh', action.payload);
        case ACTION_WC.AUTOCHANGEWORDSTATUS:
            return state.set('isAutoChangeWord', action.payload);
        case ACTION_WC.REVISECHANGEWORDSTATUS:
            return state.set('isReviseChangeWord', action.payload);
        case ACTION_WC.REVISEINDEXARRAY:
            return state.set('reviseIndexArray', action.payload);
        case ACTION_WC.REVISEINDEX:
            return state.set('reviseCurrentIndex', action.payload);
        case ACTION_WC.AUTOCHANGETIME:
            return state.set('autoChangeTime', action.payload);
        case ACTION_WC.CHANGECURRENTINDEX:
            return state.set('currentIndex', action.payload);
        case ACTION_WC.CHANGEAUTOTIMER:
            return state.set('timer', action.payload);
        case ACTION_WC.TOGGLEBACK:
            return state.set('isBack', action.payload);
        case ACTION_WC.CHANGEKNOWNSTATUS:
            return state.set('isKnown', action.payload);
        case ACTION_WC.ORIGINROWS:
            return state.set('originRows', action.payload);
        case ACTION_WC.TOGGLETIMER:
            return state.set('toggleTimer', action.payload);
        default:
            return state;
    }
};

export default WordCardRedu;

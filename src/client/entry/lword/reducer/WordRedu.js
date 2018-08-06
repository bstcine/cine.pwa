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
    currentRows: null,
    isShowAll: true,
});

const WordRedu = (state = initWordCard, action) => {
    switch (action.type) {
        case ACTION_LW.REQUEST:
            return state;
        case ACTION_LW.RECEIVE:
            return state.set('result', action.payload);
        case ACTION_LW.CURRENTROWS:
            return state.set('currentRows', action.payload);
        case ACTION_LW.CHANGESHOWALLSTATUS:
            return state.set('isShowAll', action.payload);
        default:
            return state;
    }
};

export default WordRedu;
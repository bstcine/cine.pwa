import { fromJS } from 'immutable';
import { ACTION_LV } from '@/constant/actionTypeLearn';

const initialState = fromJS({
    vocabularyList: [],
});

const WordRedu = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_LV.REQUEST:
            return state;

        case ACTION_LV.RECEIVE:
            return state.set('vocabularyList', action.payload);

        default:
            return state;
    }
};

export default WordRedu;
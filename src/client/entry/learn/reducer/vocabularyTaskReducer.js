import { fromJS } from 'immutable';
import { Action_UC } from '@/constant/actionTypeUser';

const initialState = fromJS({
    isTest:true,
});

const vocabularyRedu = (state = initialState, action) => {
    switch (action.type) {

        default:
            return state;
    }
};

export default vocabularyRedu;
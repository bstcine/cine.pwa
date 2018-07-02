import { Action_UQ } from '@/constant/actionTypeUser';

const stats = (state = { vocabStats: [], grammarStats: [] }, action) => {
    switch (action.type) {
        case Action_UQ.RECEIVE:
            return action.payload;
        default:
            return state;
    }
};

export default stats;

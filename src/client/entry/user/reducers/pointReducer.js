import { Action_UP } from '@/constant/actionTypeUser';

const points = (state = { rows: [], remark: '' }, action) => {
    switch (action.type) {
        case Action_UP.RECEIVE:
            return action.payload;
        default:
            return state;
    }
};

export default points;

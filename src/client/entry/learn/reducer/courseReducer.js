import { RECIVE_LESSON_TREE } from '@/constant/actionTypeLearn';

const lessonTree = (state = null, action) => {
    switch (action.type) {
        case RECIVE_LESSON_TREE:
            return action.payload.tree;
        default:
            return state;
    }
};

export default { lessonTree };

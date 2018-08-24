import {
    RECIVE_LESSON_TREE,
    RECIVE_LESSON_DETAIL,
} from '@/constant/actionTypeLearn';

const lessonTree = (state = null, action) => {
    switch (action.type) {
        case RECIVE_LESSON_TREE:
            return action.payload.tree;
        default:
            return state;
    }
};

const lessonDetail = (state = null, action) => {
    switch (action.type) {
        case RECIVE_LESSON_DETAIL:
            return action.payload;
        default:
            return state;
    }
};

export default { lessonTree, lessonDetail };

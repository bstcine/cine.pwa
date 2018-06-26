import {
    REQUEST_CONTENT_QUIZ,
    RECEIVE_CONTENT_QUIZ,
    REQUEST_STATS_QUIZ_SAVE,
    RECEIVE_STATS_QUIZ_SAVE,
    OPEN_LOGIN_MODAL,
    RECEIVE_STATS_STUDENT_QUIZ_WORD_LIST,
    REQUEST_STATS_STUDENT_QUIZ_WORD_LIST,
} from '@/constant/actionTypeTGrammar';
import { OPEN_NETWORK_ERROR, CLOSE_NETWORK_ERROR } from '@/constant/actionType';

/**
 * 学生答题记录-主表记录
 */
export const statsContentQuiz = (state = null, { type, payload }) => {
    switch (type) {
        case RECEIVE_CONTENT_QUIZ: {
            let { statsContentQuiz } = payload;
            if (statsContentQuiz) {
                return { ...statsContentQuiz };
            } else {
                return state;
            }
        }
        default:
            return state;
    }
};

/**
 * 网络状态，控制 spinner 组件显示状态
 * init:初始化状态
 * pending:api请求中
 */
export const network = (
    state = { init: true, pending: true, error: false },
    { type, payload }
) => {
    switch (type) {
        case REQUEST_CONTENT_QUIZ:
        case REQUEST_STATS_QUIZ_SAVE:
        case REQUEST_STATS_STUDENT_QUIZ_WORD_LIST:
            return {
                ...state,
                pending: true,
            };
        case RECEIVE_STATS_QUIZ_SAVE:
            return {
                ...state,
                pending: false,
                text: payload ? payload.text : null,
            };
        case OPEN_LOGIN_MODAL:
        case RECEIVE_CONTENT_QUIZ:
        case RECEIVE_STATS_STUDENT_QUIZ_WORD_LIST:
            return {
                ...state,
                init: false,
                pending: false,
                text: payload ? payload.text : null,
            };
        case OPEN_NETWORK_ERROR:
            return {
                ...state,
                init: false,
                pending: false,
                error: true,
                text: payload ? payload.text : null,
            };
        case CLOSE_NETWORK_ERROR:
            return {
                ...state,
                error: false,
            };
        default:
            return state;
    }
};

export const statsContentStuQuizWordList = (state = [], { type, payload }) => {
    switch (type) {
        case RECEIVE_STATS_STUDENT_QUIZ_WORD_LIST:
            return payload;
        default:
            return state;
    }
};

import {
    // REQUEST_CONTENT_QUIZ,
    RECEIVE_CONTENT_QUIZ,
    // REQUEST_STATS_QUIZ_SAVE,
    // RECEIVE_STATS_QUIZ_SAVE,
    SAVE_QUESTION1_SELECT_VALUE,
    SAVE_QUESTION3_SELECT_VALUE,
    SAVE_QUESTION3_TEXT_VALUE,
    SAVE_QUESTION3_TEXT_SCORE,
    SAVE_QUESTION4_TEXT_VALUE,
    SAVE_QUESTION_FEEDBACK,
    CLOSE_LOGIN_MODAL,
    OPEN_LOGIN_MODAL,
    RESTORE_LOCAL_ANSWERS,
    RECORD_TIME,
    SHOW_UNCOMPLETED_QUESTION,
    SHOW_ALL_QUESTION,
    UPDATE_ANSWERS,
} from '@/constant/actionTypeQuiz';
import { CurrentQuizState } from '@/constant/quiz';
// import { OPEN_NETWORK_ERROR, CLOSE_NETWORK_ERROR } from '@/constant/actionType';

/**
 * 除题目外的试卷数据
 */
export const quiz = (state = {}, { type, payload }) => {
    switch (type) {
        case RECEIVE_CONTENT_QUIZ: {
            const { quiz } = payload;
            const { id, name, status, type, question_count } = quiz;
            return {
                ...state,
                id,
                name,
                status,
                type,
                question_count,
            };
        }
        default:
            return state;
    }
};

/**
 * byId : questionId 为 key 的 question 对象
 * allIds : questionId 组成的数组
 */
export const questions = (state = { byId: {}, allIds: [] }, { type, payload }) => {
    switch (type) {
        case RECEIVE_CONTENT_QUIZ: {
            const { quiz } = payload;
            let byId = {};
            let allIds = [];
            quiz.data.forEach(question => {
                byId[question.id] = question;
                allIds.push(question.id);
            });
            return { byId, allIds };
        }
        default:
            return state;
    }
};

/**
 *  questionId 为 key 的 answers 对象
 */
export const answersById = (state = {}, { type, payload }) => {
    switch (type) {
        case SAVE_QUESTION1_SELECT_VALUE:
        case SAVE_QUESTION3_SELECT_VALUE: {
            let newState = { ...state };
            let { id: question_id, select_value } = payload;
            if (!newState[question_id]) newState[question_id] = { question_id };
            let answer = newState[question_id];
            answer.select_value = select_value;
            return newState;
        }
        case SAVE_QUESTION3_TEXT_VALUE: {
            let newState = { ...state };
            let { id: question_id, text_value } = payload;
            if (!newState[question_id]) newState[question_id] = { question_id };
            let answer = newState[question_id];
            answer.text_value = text_value;
            return newState;
        }
        case SAVE_QUESTION3_TEXT_SCORE: {
            let newState = { ...state };
            let { id: question_id, is_text_correct, text_score } = payload;
            if (!newState[question_id]) newState[question_id] = { question_id };
            let answer = newState[question_id];
            answer.is_text_correct = is_text_correct;
            answer.text_score = text_score;
            return newState;
        }
        case SAVE_QUESTION4_TEXT_VALUE: {
            let newState = { ...state };
            let { id: question_id, text_value } = payload;
            if (!newState[question_id]) newState[question_id] = { question_id };
            let answer = newState[question_id];
            answer.text_value = text_value;
            return newState;
        }
        case SAVE_QUESTION_FEEDBACK: {
            let newState = { ...state };
            let { id: question_id, feedback } = payload;
            if (!newState[question_id]) newState[question_id] = { question_id };
            let answer = newState[question_id];
            answer.feedback = feedback;
            return newState;
        }
        case RECEIVE_CONTENT_QUIZ: {
            let { statsContentQuiz, statsContentQuizDetail } = payload;
            if (
                statsContentQuiz &&
                statsContentQuizDetail &&
                statsContentQuizDetail.length
            ) {
                let newState = {};
                statsContentQuizDetail.forEach(answer => {
                    newState[answer.question_id] = answer;
                });
                return newState;
            } else {
                return state;
            }
        }
        case RESTORE_LOCAL_ANSWERS:
        case UPDATE_ANSWERS:
            return { ...payload };
        default:
            return state;
    }
};

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

// /**
//  * 网络状态，控制 spinner 组件显示状态
//  * init:初始化状态
//  * pending:api请求中
//  */
// export const network = (
//     state = { init: true, pending: true, error: false },
//     { type, payload }
// ) => {
//     switch (type) {
//         case REQUEST_CONTENT_QUIZ:
//         case REQUEST_STATS_QUIZ_SAVE:
//             return {
//                 ...state,
//                 pending: true,
//             };
//         case RECEIVE_STATS_QUIZ_SAVE:
//             return {
//                 ...state,
//                 pending: false,
//                 text: payload ? payload.text : null,
//             };
//         case OPEN_LOGIN_MODAL:
//         case RECEIVE_CONTENT_QUIZ:
//             return {
//                 ...state,
//                 init: false,
//                 pending: false,
//                 text: payload ? payload.text : null,
//             };
//         case OPEN_NETWORK_ERROR:
//             return {
//                 ...state,
//                 init: false,
//                 pending: false,
//                 error: true,
//                 text: payload ? payload.text : null,
//             };
//         case CLOSE_NETWORK_ERROR:
//             return {
//                 ...state,
//                 error: false,
//             };
//         default:
//             return state;
//     }
// };

export const loginModal = (state = { isOpen: false }, { type, payload }) => {
    switch (type) {
        case CLOSE_LOGIN_MODAL:
            return { isOpen: false };
        case OPEN_LOGIN_MODAL: {
            return { isOpen: true };
        }
        default:
            return state;
    }
};

export const timer = (state = {}, { type, payload }) => {
    switch (type) {
        case RECORD_TIME: {
            let startTime = payload.startTime;
            return { ...state, startTime };
        }
        default:
            return state;
    }
};

export const questionsFilter = (state = SHOW_ALL_QUESTION, { type, payload }) => {
    switch (type) {
        case SHOW_UNCOMPLETED_QUESTION:
            return SHOW_UNCOMPLETED_QUESTION;
        case SHOW_ALL_QUESTION:
            return SHOW_ALL_QUESTION;
        default:
            return state;
    }
};

/**
 * 当前试卷的状态，不同的角色不同的答题记录对应不同的状态
 */
export const currentQuizState = (
    state = CurrentQuizState.REVIEWING,
    { type, payload }
) => {
    switch (type) {
        case RECEIVE_CONTENT_QUIZ:
            return payload.currentQuizState;
        default:
            return state;
    }
};

export const taskScheduleId = (state = null, { type, payload }) => {
    switch (type) {
        case RECEIVE_CONTENT_QUIZ:
            return payload.taskScheduleId;
        default:
            return state;
    }
};

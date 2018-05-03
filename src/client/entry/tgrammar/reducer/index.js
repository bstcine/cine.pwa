import { combineReducers } from 'redux';

import {
    REQUEST_QUIZ_DATA,
    RECEIVE_QUIZ_DATA,
    SAVE_QUESTION1_SELECT_ANSWER,
    SAVE_QUESTION1_FEEDBACK_SELECT_ANSWER,
    SAVE_QUESTION3_SELECT_ANSWER,
    SAVE_QUESTION3_TEXT_ANSWER,
    SAVE_QUESTION3_FEEDBACK_SELECT_ANSWER,
    SAVE_FEEDBACK_TEXT,
    UPLOADING_QUESTIONS,
    UPLOADED_QUESTIONS,
    CLOSE_TIP_MODAL,
    OPEN_TIP_MODAL,
    OPEN_CONFIRM_MODAL,
    CLOSE_CONFIRM_MODAL,
    CLOSE_LOGIN_MODAL,
    OPEN_LOGIN_MODAL,
    REQUEST_STATS_QUIZ_LIST,
    RECEIVE_STATS_QUIZ_LIST,
    NETWORK_ERROR,
    NETWORK_ERROR_TIMEOUT,
    RESTORE_LOCAL_ANSWERS,
    RECORD_TIME,
    SHOW_UNCOMPLETED_QUESTION,
    SHOW_ALL_QUESTION,
    UPDATE_ANSWERS,
} from '@/constant/actionTypeTGrammar';
import { CurrentQuizState } from '@/constant/index';

/**
 * 除题目外的试卷数据
 */
const quiz = (state = {}, { type, payload }) => {
    switch (type) {
        case RECEIVE_QUIZ_DATA: {
            const { quiz } = payload;
            const { id, name, status, question_count } = quiz;
            return {
                ...state,
                id,
                name,
                status,
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
const questions = (state = { byId: {}, allIds: [] }, { type, payload }) => {
    switch (type) {
        case RECEIVE_QUIZ_DATA: {
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
const answersById = (state = {}, { type, payload }) => {
    switch (type) {
        case SAVE_QUESTION1_SELECT_ANSWER:
        case SAVE_QUESTION3_SELECT_ANSWER: {
            let newState = { ...state };
            let { id: question_id, select_value } = payload;
            if (!newState[question_id]) newState[question_id] = { question_id };
            let answer = newState[question_id];
            answer.select_value = select_value;
            return newState;
        }
        case SAVE_QUESTION3_TEXT_ANSWER: {
            let newState = { ...state };
            let { id: question_id, text_value } = payload;
            if (!newState[question_id]) newState[question_id] = { question_id };
            let answer = newState[question_id];
            answer.text_value = text_value;
            return newState;
        }
        case SAVE_QUESTION1_FEEDBACK_SELECT_ANSWER: {
            let newState = { ...state };
            let { id: question_id, is_select_correct } = payload;
            if (!newState[question_id]) newState[question_id] = { question_id };
            let answer = newState[question_id];
            answer.is_select_correct = is_select_correct;
            return newState;
        }
        case SAVE_QUESTION3_FEEDBACK_SELECT_ANSWER: {
            let newState = { ...state };
            let { id: question_id, is_text_correct, text_score } = payload;
            if (!newState[question_id]) newState[question_id] = { question_id };
            let answer = newState[question_id];
            answer.is_text_correct = is_text_correct;
            answer.text_score = text_score;
            return newState;
        }
        case SAVE_FEEDBACK_TEXT: {
            let newState = { ...state };
            let { id: question_id, feedback } = payload;
            if (!newState[question_id]) newState[question_id] = { question_id };
            let answer = newState[question_id];
            answer.feedback = feedback;
            return newState;
        }
        case RECEIVE_QUIZ_DATA: {
            let { statsQuiz, statsQuizDetail } = payload;
            if (statsQuiz && statsQuizDetail && statsQuizDetail.length) {
                let newState = {};
                statsQuizDetail.forEach(answer => {
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
const statsQuiz = (state = null, { type, payload }) => {
    switch (type) {
        case RECEIVE_QUIZ_DATA: {
            let { statsQuiz } = payload;
            if (statsQuiz) {
                return { ...statsQuiz };
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
const network = (
    state = { init: true, pending: true, error: false },
    { type, payload }
) => {
    switch (type) {
        case REQUEST_QUIZ_DATA:
        case UPLOADING_QUESTIONS:
        case REQUEST_STATS_QUIZ_LIST:
            return {
                ...state,
                pending: true,
            };
        case UPLOADED_QUESTIONS:
            return {
                ...state,
                pending: false,
                text: payload ? payload.text : null,
            };
        case OPEN_LOGIN_MODAL:
        case RECEIVE_QUIZ_DATA:
        case RECEIVE_STATS_QUIZ_LIST:
            return {
                ...state,
                init: false,
                pending: false,
                text: payload ? payload.text : null,
            };
        case NETWORK_ERROR:
            return {
                ...state,
                init: false,
                pending: false,
                error: true,
                text: payload ? payload.text : null,
            };
        case NETWORK_ERROR_TIMEOUT:
            return {
                ...state,
                error: false,
            };
        default:
            return state;
    }
};

const user = (state = {}, { type, payload }) => {
    switch (type) {
        case RECEIVE_QUIZ_DATA:
            return { ...payload.user };
        default:
            return state;
    }
};

const tipModal = (state = { isOpen: false }, { type, payload }) => {
    switch (type) {
        case CLOSE_TIP_MODAL:
            return { isOpen: false };
        case OPEN_TIP_MODAL:
            return { isOpen: true, text: payload.text };
        default:
            return state;
    }
};

const confirmModal = (state = { isOpen: false }, { type, payload }) => {
    switch (type) {
        case CLOSE_CONFIRM_MODAL:
            return { isOpen: false };
        case OPEN_CONFIRM_MODAL: {
            let { text, onConfirm, onCancel } = payload;
            return { isOpen: true, text, onConfirm, onCancel };
        }
        default:
            return state;
    }
};

const loginModal = (state = { isOpen: false }, { type, payload }) => {
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

const statsQuizList = (state = [], { type, payload }) => {
    switch (type) {
        case RECEIVE_STATS_QUIZ_LIST:
            return [...payload];
        default:
            return state;
    }
};

const timer = (state = {}, { type, payload }) => {
    switch (type) {
        case RECORD_TIME: {
            let startTime = payload.startTime;
            return { ...state, startTime };
        }
        default:
            return state;
    }
};

const questionsFilter = (state = 'ALL', { type, payload }) => {
    switch (type) {
        case SHOW_UNCOMPLETED_QUESTION:
            return 'UNCOMPLETED';
        case SHOW_ALL_QUESTION:
            return 'ALL';
        default:
            return state;
    }
};

/**
 * 当前试卷的状态，不同的角色不同的答题记录对应不同的状态
 */
const currentQuizState = (
    state = CurrentQuizState.REVIEWING,
    { type, payload }
) => {
    switch (type) {
        case RECEIVE_QUIZ_DATA:
            return payload.currentQuizState;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    quiz,
    user,
    statsQuiz,
    questions,
    statsQuizList,
    answersById,
    network,
    tipModal,
    confirmModal,
    loginModal,
    timer,
    questionsFilter,
    currentQuizState,
});

export default rootReducer;

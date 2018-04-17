import {combineReducers} from 'redux';

import {
    SAVE_USER,
    UPDATE_OPERATION,
    REQUEST_QUIZ_DATA,
    RECEIVE_QUIZ_DATA,
    REQUEST_STATS_QUIZ_DATA,
    RECEIVE_STATS_QUIZ_DATA,
    SAVE_QUESTION1_SELECT_ANSWER,
    SAVE_QUESTION1_FEEDBACK_SELECT_ANSWER,
    SAVE_QUESTION3_SELECT_ANSWER,
    SAVE_QUESTION3_TEXT_ANSWER,
    SAVE_QUESTION3_FEEDBACK_SELECT_ANSWER,
    SAVE_QUESTION3_FEEDBACK_TEXT_ANSWER,
    UPLOADING_QUESTIONS,
    UPLOADED_QUESTIONS,
    CLOSE_TIP_MODAL,
    OPEN_TIP_MODAL,
    REQUEST_STATS_QUIZ_LIST,
    RECEIVE_STATS_QUIZ_LIST,
} from '../action';

/**
 * 除题目外的测验数据
 */
const quiz = (state = {}, {type, payload}) => {
    switch (type) {
        case RECEIVE_QUIZ_DATA:
            return {
                ...state,
                id: payload.id,
                name: payload.name,
                count: payload.question_count
            };
        default:
            return state;
    }
};

/**
 *  questionId 组成的数组
 */
const questionIds = (state = [], {type, payload}) => {
    switch (type) {
        case RECEIVE_QUIZ_DATA: {
            let newState = payload.questions.map(question => question.id);
            return newState;
        }
        default:
            return state;
    }
};

/**
 *  questionId 为 key 的 questions 对象
 */
const questionsById = (state = {}, {type, payload}) => {
    switch (type) {
        case RECEIVE_QUIZ_DATA: {
            let newState = {...state};
            payload.questions.forEach(question => {
                newState[question.id] = question;
            });
            return newState;
        }
        default:
            return state;
    }
};

/**
 *  questionId 为 key 的 answers 对象
 */
const answersById = (state = {}, {type, payload}) => {
    switch (type) {
        case SAVE_QUESTION1_SELECT_ANSWER:
        case SAVE_QUESTION3_SELECT_ANSWER: {
            let newState = {...state};
            let {id: question_id, select_value} = payload;
            if (!newState[question_id]) newState[question_id] = {question_id};
            let answer = newState[question_id];
            answer.select_value = select_value;
            return newState;
        }
        case SAVE_QUESTION3_TEXT_ANSWER: {
            let newState = {...state};
            let {id: question_id, text_value} = payload;
            if (!newState[question_id]) newState[question_id] = {question_id};
            let answer = newState[question_id];
            answer.text_value = text_value;
            return newState;
        }
        case SAVE_QUESTION1_FEEDBACK_SELECT_ANSWER:
        case SAVE_QUESTION3_FEEDBACK_SELECT_ANSWER: {
            let newState = {...state};
            let {id: question_id, is_correct} = payload;
            if (!newState[question_id]) newState[question_id] = {question_id};
            let answer = newState[question_id];
            answer.is_correct = is_correct;
            return newState;
        }
        case SAVE_QUESTION3_FEEDBACK_TEXT_ANSWER: {
            let newState = {...state};
            let {id: question_id, feedback} = payload;
            if (!newState[question_id]) newState[question_id] = {question_id};
            let answer = newState[question_id];
            answer.feedback = feedback;
            return newState;
        }
        case RECEIVE_STATS_QUIZ_DATA: {
            let newState = {};
            let answers = payload.statsQuizDetail;
            answers.forEach(answer => {
                newState[answer.question_id] = answer;
            });
            return newState;
        }
        default:
            return state;
    }
};

/**
 * 学生答题记录-主表记录
 */
const statsQuiz = (state = {}, {type, payload}) => {
    switch (type) {
        case RECEIVE_STATS_QUIZ_DATA: {
            let statsQuiz = payload.statsQuiz;
            return {...statsQuiz};
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
const network = (state = {init: true, pending: true}, {type, payload}) => {
    switch (type) {
        case REQUEST_QUIZ_DATA:
        case UPLOADING_QUESTIONS:
        case REQUEST_STATS_QUIZ_DATA:
        case REQUEST_STATS_QUIZ_LIST:
            return {
                ...state,
                pending: true
            };
        case UPLOADED_QUESTIONS:
        case RECEIVE_STATS_QUIZ_DATA:
            return {
                ...state,
                pending: false
            };
        case RECEIVE_QUIZ_DATA:
        case RECEIVE_STATS_QUIZ_LIST:
            return {
                ...state,
                init: false,
                pending: false
            };
        default:
            return state;
    }
};

const user = (state = {}, {type, payload}) => {
    switch (type) {
        case SAVE_USER:
            return {...payload};
        default:
            return state;
    }
};

const operation = (
    state = {
        is_stu_operation_visible: false,
        is_stu_operation_editable: false,
        is_tea_operation_visible: false,
        is_tea_operation_editable: false
    },
    {type, payload}
) => {
    switch (type) {
        case UPDATE_OPERATION:
            return {...payload};
        default:
            return state;
    }
};

const tipModal = (state = {isOpen: false}, {type, payload}) => {
    switch (type) {
        case CLOSE_TIP_MODAL:
            return {isOpen: false};
        case OPEN_TIP_MODAL:
            return {isOpen: true};
        default:
            return state;
    }
};

const statsQuizList = (state = [], {type, payload}) => {
    switch (type) {
        case RECEIVE_STATS_QUIZ_LIST:
            return [...payload];
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    quiz,
    user,
    operation,
    questionIds,
    questionsById,
    statsQuiz,
    statsQuizList,
    answersById,
    network,
    tipModal
});

export default rootReducer;

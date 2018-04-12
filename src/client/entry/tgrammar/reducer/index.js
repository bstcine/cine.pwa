import {combineReducers} from 'redux';

import {
    REQUEST_QUIZ_DATA,
    RECEIVE_QUIZ_DATA,
    REQUEST_STATS_QUIZ_DATA,
    RECEIVE_STATS_QUIZ_DATA,
    SAVE_QUESTION1_SELECT_ANSWER,
    SAVE_QUESTION3_SELECT_ANSWER,
    SAVE_QUESTION3_TEXT_ANSWER,
    UPLOADING_QUESTIONS,
    UPLOADED_QUESTIONS
} from '../action';

const quiz = (state = {}, {type, payload}) => {
    switch (type) {
        case RECEIVE_QUIZ_DATA:
            return {
                ...state,
                name: payload.name,
                count: payload.count,
                questions: payload.questions
            };
        default:
            return state;
    }
};

const questionsById = (state = {}, {type, payload}) => {
    switch (type) {
        case RECEIVE_QUIZ_DATA: {
            let newState = {...state};
            payload.questions.forEach((question) => {
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
 * @param {*} state
 * @param {*} action
 */
const answersById = (state = {}, {type, payload}) => {
    switch (type) {
        case SAVE_QUESTION1_SELECT_ANSWER: {
            let newState = {...state};
            if (!newState[payload.question_id]) newState[payload.question_id] = {question_id: payload.question_id};
            let answer = newState[payload.question_id];
            answer.select_value = payload.select_value;
            return newState;
        }
        case SAVE_QUESTION3_SELECT_ANSWER: {
            let newState = {...state};
            if (!newState[payload.question_id]) newState[payload.question_id] = {question_id: payload.question_id};
            let answer = newState[payload.question_id];
            answer.select_value = payload.select_value;
            return newState;
        }
        case SAVE_QUESTION3_TEXT_ANSWER: {
            let newState = {...state};
            if (!newState[payload.question_id]) newState[payload.question_id] = {question_id: payload.question_id};
            let answer = newState[payload.question_id];
            answer.text_value = payload.text_value;
            return newState;
        }
        case RECEIVE_STATS_QUIZ_DATA: {
            let newState = {};
            let answers = payload.statsQuizDetail;
            answers.forEach(answer => {
                newState[answer.question_id] = answer;
            });
            console.log('newState', newState);
            return newState;
        }
        default:
            return state;
    }
};

const network = (state = {pending: true}, {type, payload}) => {
    switch (type) {
        case UPLOADING_QUESTIONS:
        case REQUEST_QUIZ_DATA:
        case REQUEST_STATS_QUIZ_DATA:
            return {
                ...state,
                pending: true
            };
        case UPLOADED_QUESTIONS:
        case RECEIVE_QUIZ_DATA:
        case RECEIVE_STATS_QUIZ_DATA:
            return {
                ...state,
                pending: false
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    quiz,
    questionsById,
    answersById,
    network
});

export default rootReducer;

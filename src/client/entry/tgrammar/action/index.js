import {fetchData} from '@/service/base';
import Api from '@/../APIConfig';

export const REQUEST_QUIZ_DATA = 'REQUEST_QUIZ_DATA';
export const RECEIVE_QUIZ_DATA = 'RECEIVE_QUIZ_DATA';
export const REQUEST_STATS_QUIZ_DATA = 'REQUEST_STATS_QUIZ_DATA';
export const RECEIVE_STATS_QUIZ_DATA = 'RECEIVE_STATS_QUIZ_DATA';
export const SAVE_QUESTION1_SELECT_ANSWER = 'SAVE_QUESTION1_SELECT_ANSWER';
export const SAVE_QUESTION3_SELECT_ANSWER = 'SAVE_QUESTION3_SELECT_ANSWER';
export const SAVE_QUESTION3_TEXT_ANSWER = 'SAVE_QUESTION3_TEXT_ANSWER';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const UPLOADING_QUESTIONS = 'UPLOADING_QUESTIONS';
export const UPLOADED_QUESTIONS = 'UPLOADED_QUESTIONS';

export const requestQuizData = () => ({
    type: REQUEST_QUIZ_DATA
});


// todo 服务端添加count字段
export const receiveQuizData = ({id, name, count, data: questions}) => {
    return {
        type: RECEIVE_QUIZ_DATA,
        payload: {
            id,
            name,
            count,
            questions
        }
    };
};

/**
 * 题目数据请求 & 答题记录请求
 */
export const fetchQuizData = ({stats_quiz_id}) => async dispatch => {
    dispatch(requestQuizData());
    let [err, result] = await fetchData(Api.APIURL_Content_Quiz_Grammar);
    if (err) console.log(err);
    dispatch(receiveQuizData(result));
    if (!stats_quiz_id) return;
    dispatch(requestStatsQuizData());
    let [err_detail, result_detail] = await fetchData(Api.APIURL_Stats_Quiz_Detail, {cid: stats_quiz_id});
    if (err_detail) console.log(err_detail);
    let {statsQuiz, statsQuizDetail} = result_detail;
    dispatch(receiveStatsQuizData({statsQuiz, statsQuizDetail}));
};

export const requestStatsQuizData = () => ({
    type: REQUEST_STATS_QUIZ_DATA
});

export const receiveStatsQuizData = ({statsQuiz, statsQuizDetail}) => ({
    type: RECEIVE_STATS_QUIZ_DATA,
    payload: {
        statsQuiz,
        statsQuizDetail
    }
});

export const saveQuestion1SelectAnswer = ({question_id, select_value}) => ({
    type: SAVE_QUESTION1_SELECT_ANSWER,
    payload: {
        question_id,
        select_value
    }
});

export const saveQuestion3SelectAnswer = ({question_id, select_value}) => ({
    type: SAVE_QUESTION3_SELECT_ANSWER,
    payload: {
        question_id,
        select_value
    }
});

export const saveQuestion3TextAnswer = ({question_id, text_value}) => ({
    type: SAVE_QUESTION3_TEXT_ANSWER,
    payload: {
        question_id,
        text_value
    }
});

/**
 * 提交答案
 */
export const saveQuestions = () => (dispatch, getState) => {
    let {quiz, questionsById, answersById} = getState();
    if (!hasCompleteQuiz(questionsById, answersById)) return alert('请答完全部试题再后提交');
    let answers = [];
    for (let key in answersById) {
        if (answersById.hasOwnProperty(key)) {
            answers.push(answersById[key]);
        }
    }
    dispatch({type: UPLOADING_QUESTIONS});
    return fetchData(Api.APIURL_Stats_Quiz_Save, {quiz_id: quiz.id, answers}).then(([err, result]) => {
        if (err) console.log(err);
        dispatch({type: UPLOADED_QUESTIONS});
    });
};

/**
 * 题目是否全部做完
 * @param {*} questionsById
 * @param {*} answersById
 */
const hasCompleteQuiz = (questionsById, answersById) => {
    let isComplete = true;
    for (let key in questionsById) {
        if (questionsById.hasOwnProperty(key)) {
            let question = questionsById[key];
            if (question.format === 1) {
                let answer = answersById[key];
                if (!answer || !answer.select_value) {
                    isComplete = false;
                    break;
                }
            } else if (question.format === 3) {
                let answer = answersById[key];
                if (!answer || !answer.select_value || !answer.text_value) {
                    isComplete = false;
                    break;
                }
            }
        }
    }
    return isComplete;
};

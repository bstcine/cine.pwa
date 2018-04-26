import { fetchData } from '@/service/base';
import Api, { APIURL_Stats_Quiz_Reset } from '@/../APIConfig';
import storeUtil from '@/util/storeUtil';
import { ANSWERING, WAITING4CHECK, CHECKING } from '@/constant/statsQuizStatus';
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
} from '@/constant/actionTypeTGrammar';
import { STUDENT, TEACHER, ADMINISTRATOR } from '@/constant/roleId';

export const saveUser = user => ({
    type: SAVE_USER,
    payload: user,
});

export const requestQuizData = () => ({
    type: REQUEST_QUIZ_DATA,
});

export const receiveQuizData = ({
    id,
    name,
    question_count,
    data: questions,
}) => {
    return {
        type: RECEIVE_QUIZ_DATA,
        payload: {
            id,
            name,
            question_count,
            questions,
        },
    };
};

/**
 * 题目数据请求 & 答题记录请求
 */
export const fetchQuizData = ({ stats_quiz_id }) => async dispatch => {
    dispatch(requestQuizData());
    let [err, result] = await fetchData(Api.APIURL_Content_Quiz_Grammar);
    if (err) return dispatch(networkError(err));
    let { user, quiz, lastestStatsQuiz } = result;
    let lastest_stats_quiz_id = null;
    if (lastestStatsQuiz) {
        lastest_stats_quiz_id = lastestStatsQuiz.id;
    }
    if (
        (user.role_id === ADMINISTRATOR || user.role_id === TEACHER) &&
        !stats_quiz_id
    ) {
        location.href = '/tgrammar/stats/list';
        return;
    }
    dispatch(saveUser(user));
    quiz.data = quizDataFix(quiz.data);
    dispatch(receiveQuizData(quiz));
    if (user.role_id === STUDENT && !stats_quiz_id && !lastest_stats_quiz_id) {
        let localAnswer = hasLocalAnswers(quiz, user);
        if (localAnswer) {
            if (confirm('检测到有未提交的答题记录，是否恢复？')) {
                dispatch(restoreLocalAnswers(localAnswer));
            } else {
                clearLocalAnswers(quiz, user);
            }
        }
        dispatch(recordTime());
    }
    if (stats_quiz_id || lastest_stats_quiz_id) {
        dispatch(
            fetchStatQuiz({
                stats_quiz_id: stats_quiz_id || lastest_stats_quiz_id,
                user,
            })
        );
    } else {
        dispatch(updateOperation({ user }));
    }
};

const quizDataFix = data => {
    let no = 0;
    data.forEach(question => {
        if (question.format === 1 || question.format === 3) {
            no++;
            question.no = no;
        }
        if (question.answers) {
            // 后端 api 选项字段命名不合理，前端 fix
            question.options = question.answers.map((item, index) => {
                item.value = index;
                return item;
            });
            delete question.answers;
        }
    });
    return data;
};

const fetchStatQuiz = ({ stats_quiz_id, user }) => async (dispatch, getState) => {
    let { questionsById } = getState();
    dispatch(requestStatsQuizData());
    let [err, result] = await fetchData(Api.APIURL_Stats_Quiz_Detail, {
        cid: stats_quiz_id,
    });
    if (err) return dispatch(networkError(err));
    let { statsQuiz, statsQuizDetail } = result;
    if (
        user.role_id === STUDENT &&
        (statsQuiz.status === WAITING4CHECK || statsQuiz.status === CHECKING)
    ) {
        let html = `<div class="waiting"><div class="waiting-img"></div><span>当前老师正在批改中…，请稍候查看结果</span></div>`;
        dispatch(openTipModal({ html }));
    }
    statsQuizDetail.forEach(item => {
        if (user.role_id === TEACHER && !item.feedback) item.feedback = questionsById[item.question_id].feedback;
    });
    dispatch(receiveStatsQuizData({ statsQuiz, statsQuizDetail }));
    dispatch(updateOperation({ user, statsQuiz }));
};

/**
 * 提交答案
 */
export const preSubmitAnswer = () => (dispatch, getState) => {
    let { questionsById, answersById } = getState();
    let unCompletedNos = _getUnCompletedNos(questionsById, answersById);
    if (unCompletedNos.length) {
        let html = `<p>你有 ${unCompletedNos.join('、')} 共 ${
            unCompletedNos.length
        } 道题未答，是否确定提交答卷？</p>`;
        let cancelButton = '否，我要继续答题';
        let confirmButton = '是，现在就提交';
        return dispatch(openConfirmModal({ html, cancelButton, confirmButton }));
    }
    dispatch(submitAnswer());
};

/**
 * 提交答案
 */
export const submitAnswer = () => (dispatch, getState) => {
    let {
        quiz,
        user,
        answersById,
        questionIds,
        questionsById,
        timer,
    } = getState();
    let duration = Math.round((new Date().getTime() - timer.startTime) / 1000);
    let answers = [];
    questionIds.forEach(questionId => {
        let question = questionsById[questionId];
        if (question.format === 3) {
            let answer = answersById[questionId] || { question_id: questionId };
            answer.is_select_correct =
                (question.isCorrect && answer.select_value === 1) ||
                (!question.isCorrect && answer.select_value === 0)
                    ? 1
                    : 0;
            answer.select_score = answer.is_select_correct ? 1 : 0;
            if (answer.is_select_correct === 0) {
                answer.is_text_correct = 0;
                answer.text_score = 0;
            }
            answers.push(answer);
        }
    });
    dispatch({ type: UPLOADING_QUESTIONS });
    return fetchData(Api.APIURL_Stats_Quiz_Save, {
        quiz_id: quiz.id,
        answers,
        duration,
    }).then(([err, result]) => {
        if (err) {
            if (err === 'no_login') return dispatch(openLoginModal());
            return dispatch(networkError(err));
        }
        dispatch({ type: UPLOADED_QUESTIONS });
        clearLocalAnswers(quiz, user);
        location.href = `/tgrammar/quiz?stats_quiz_id=${result.statsQuiz.id}`;
    });
};

/**
 * 提交批改记录
 */
export const submitCheckAnswer = (complete = true) => async (
    dispatch,
    getState
) => {
    let { statsQuiz, questionIds, questionsById, answersById } = getState();
    if (!_hasCompleteCheckQuiz(questionsById, answersById)) return alert('请批改完全部试题后再提交');
    let answers = [];
    let score = 0;
    questionIds.forEach(questionId => {
        let question = questionsById[questionId];
        if (question.format === 3) {
            let answer = answersById[questionId];
            if (typeof answer.select_score === 'number') score += answer.select_score;
            if (typeof answer.text_score === 'number') score += answer.text_score;
            answers.push(answer);
        }
    });
    dispatch({ type: UPLOADING_QUESTIONS });
    let [err] = await fetchData(Api.APIURL_Stats_Quiz_Update, {
        stats_quiz_id: statsQuiz.id,
        answers,
        complete,
        score,
    });
    if (err) {
        if (err === 'no_login') return dispatch(openLoginModal());
        return dispatch(networkError(err));
    }
    dispatch({ type: UPLOADED_QUESTIONS });
    location.href = '/tgrammar/stats/list';
};

export const resetQuiz = () => async (dispatch, getState) => {
    let { statsQuiz } = getState();
    let [err] = await fetchData(APIURL_Stats_Quiz_Reset, {
        stats_quiz_id: statsQuiz.id,
    });
    if (err) {
        if (err === 'no_login') return dispatch(openLoginModal());
        return dispatch(networkError(err));
    }
    alert('重置成功!');
};

const recordTime = () => ({
    type: RECORD_TIME,
    payload: {
        startTime: new Date().getTime(),
    },
});

export const fetchStatsQuizList = () => async dispatch => {
    dispatch({ type: REQUEST_STATS_QUIZ_LIST });
    let [err, result] = await fetchData(Api.APIURL_Stats_Quiz_List);
    if (err) return dispatch(networkError(err));
    dispatch({ type: RECEIVE_STATS_QUIZ_LIST, payload: result });
};

export const requestStatsQuizData = () => ({
    type: REQUEST_STATS_QUIZ_DATA,
});

export const receiveStatsQuizData = ({ statsQuiz, statsQuizDetail }) => ({
    type: RECEIVE_STATS_QUIZ_DATA,
    payload: {
        statsQuiz,
        statsQuizDetail,
    },
});

export const saveQuestion1SelectAnswer = ({ id, select_value }) => dispatch => {
    dispatch({
        type: SAVE_QUESTION1_SELECT_ANSWER,
        payload: {
            id,
            select_value,
        },
    });
    dispatch(autoSaveLocalAnswers());
};

export const saveQuestion1FeedbackSelectAnswer = ({
    id,
    is_select_correct,
}) => dispatch => {
    dispatch({
        type: SAVE_QUESTION1_FEEDBACK_SELECT_ANSWER,
        payload: {
            id,
            is_select_correct,
        },
    });
    dispatch(autoSaveLocalAnswers());
};

export const saveQuestion3SelectAnswer = ({ id, select_value }) => dispatch => {
    dispatch({
        type: SAVE_QUESTION3_SELECT_ANSWER,
        payload: {
            id,
            select_value,
        },
    });
    dispatch(autoSaveLocalAnswers());
};

export const saveQuestion3TextAnswer = ({ id, text_value }) => dispatch => {
    dispatch({
        type: SAVE_QUESTION3_TEXT_ANSWER,
        payload: {
            id,
            text_value,
        },
    });
    dispatch(autoSaveLocalAnswers());
};

export const saveQuestion3FeedbackTextAnswer = ({ id, feedback }) => dispatch => {
    dispatch({
        type: SAVE_QUESTION3_FEEDBACK_TEXT_ANSWER,
        payload: {
            id,
            feedback,
        },
    });
    dispatch(autoSaveLocalAnswers());
};

export const saveQuestion3FeedbackSelectAnswer = ({
    id,
    is_text_correct,
}) => dispatch => {
    dispatch({
        type: SAVE_QUESTION3_FEEDBACK_SELECT_ANSWER,
        payload: {
            id,
            is_text_correct,
            text_score: is_text_correct ? 1 : 0,
        },
    });
    dispatch(autoSaveLocalAnswers());
};

export const autoSaveLocalAnswers = () => (dispatch, getState) => {
    let { quiz, user, answersById } = getState();
    const key = quiz.id + user.id;
    storeUtil.set(key, answersById);
};

const hasLocalAnswers = (quiz, user) => {
    const key = quiz.id + user.id;
    return storeUtil.get(key);
};

const restoreLocalAnswers = answersById => ({
    type: RESTORE_LOCAL_ANSWERS,
    payload: answersById,
});

const clearLocalAnswers = (quiz, user) => {
    const key = quiz.id + user.id;
    storeUtil.remove(key);
};

export const networkError = err => dispatch => {
    let text = err instanceof Error ? err.message : err;
    dispatch({
        type: NETWORK_ERROR,
        payload: { text },
    });
    setTimeout(() => {
        dispatch({
            type: NETWORK_ERROR_TIMEOUT,
            payload: { text },
        });
    }, 3000);
};

/**
 * 更新当前操作状态
 */
export const updateOperation = ({ user, statsQuiz }) => {
    const isStudent = user && user.role_id === STUDENT;
    const isTeacher = user && user.role_id === TEACHER;
    const statsQuizStatus = statsQuiz ? statsQuiz.status : ANSWERING;
    return {
        type: UPDATE_OPERATION,
        payload: {
            isStudent,
            isTeacher,
            statsQuizStatus,
        },
    };
};

export const closeTipModal = () => ({
    type: CLOSE_TIP_MODAL,
});

export const openTipModal = ({ html, button }) => ({
    type: OPEN_TIP_MODAL,
    payload: { html, button },
});

export const closeConfirmModal = () => ({
    type: CLOSE_CONFIRM_MODAL,
});

export const openConfirmModal = ({ html, cancelButton, confirmButton }) => ({
    type: OPEN_CONFIRM_MODAL,
    payload: { html, cancelButton, confirmButton },
});

export const closeLoginModal = () => ({
    type: CLOSE_LOGIN_MODAL,
});

export const openLoginModal = () => ({
    type: OPEN_LOGIN_MODAL,
});

/**
 * 题目是否全部做完
 * @param {*} questionsById
 * @param {*} answersById
 */
const _getUnCompletedNos = (questionsById, answersById) => {
    let unCompletedNos = [];
    let questionIndex = 0;
    for (let key in questionsById) {
        if (questionsById.hasOwnProperty(key)) {
            let question = questionsById[key];
            if (question.format === 1) {
                questionIndex++;
                let answer = answersById[key];
                if (!answer || typeof answer.select_value !== 'number') {
                    unCompletedNos.push(questionIndex);
                }
            } else if (question.format === 3) {
                questionIndex++;
                let answer = answersById[key];
                if (!answer || typeof answer.select_value !== 'number') {
                    unCompletedNos.push(questionIndex);
                } else {
                    if (answer.select_value === 0 && !answer.text_value) {
                        unCompletedNos.push(questionIndex);
                    }
                }
            }
        }
    }
    return unCompletedNos;
};

/**
 * 检查是否全部批改完成
 */
const _hasCompleteCheckQuiz = () => {
    return true;
};

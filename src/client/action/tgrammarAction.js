import { fetchData } from '@/service/base';
import Api from '@/../APIConfig';
import storeUtil from '@/util/storeUtil';
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
    if ((user.role_id === '1' || user.role_id === '2') && !stats_quiz_id) {
        location.href = '/tgrammar/stats/list';
        return;
    }
    dispatch(saveUser(user));
    let no = 0;
    quiz.data.forEach(question => {
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
    dispatch(receiveQuizData(quiz));
    if (user.role_id === '3' && !stats_quiz_id && !lastest_stats_quiz_id) {
        let localAnswer = hasLocalAnswers(quiz, user);
        if (localAnswer && confirm('检测到有未提交的答题记录，是否恢复？')) {
            dispatch(restoreLocalAnswers(localAnswer));
        } else {
            let html = `<p>本试题用于测试学生的英语文法基础和阅读能力，故本试题中所涉及的语法都是事关英语句子结构的重点语法。对于一些细节性的语法，例如family做主语算单数还是复数这样的问题，我们不做考察。但对于定语从句里that在什么情况下可以省略、什么情况不可以省略的问题，我们加以考察，因为这个知识点直接关系到学生对句子结构的分析和对复杂句子的理解。</p>
            <p>这份试题被故意设计用于测试K-12年级的广谱学生，因此可能会有学生觉得一些题目困难，而另一些学生觉得一些题目特别简单，这是很正常的。挑选自己能做的做。在选择题部分，随机的猜测将不会提高学生的成绩，因为做错一题将被倒扣1/3分</p>`;
            let button = '开始测试';
            dispatch(openTipModal({ html, button }));
        }
        dispatch(recordTime());
    }
    if (stats_quiz_id || lastest_stats_quiz_id) {
        dispatch(requestStatsQuizData());
        let [err_detail, result_detail] = await fetchData(
            Api.APIURL_Stats_Quiz_Detail,
            { cid: stats_quiz_id || lastest_stats_quiz_id }
        );
        if (err_detail) return dispatch(networkError(err_detail));
        let { statsQuiz, statsQuizDetail } = result_detail;
        if (
            user &&
            user.role_id === '3' &&
            (statsQuiz.status === '1' || statsQuiz.status === '2')
        ) {
            let html = `<div class="waiting"><div class="waiting-img"></div><span>当前老师正在批改中…，请稍候查看结果</span></div>`;
            dispatch(openTipModal({ html }));
        }
        dispatch(receiveStatsQuizData({ statsQuiz, statsQuizDetail }));
        dispatch(updateOperation({ user, statsQuiz }));
    } else {
        dispatch(updateOperation({ user }));
    }
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
    let { quiz, user, answersById, timer } = getState();
    let duration = Math.round((new Date().getTime() - timer.startTime) / 1000);
    let answers = [];
    for (let key in answersById) {
        if (answersById.hasOwnProperty(key)) {
            answers.push(answersById[key]);
        }
    }
    dispatch({ type: UPLOADING_QUESTIONS });
    return fetchData(Api.APIURL_Stats_Quiz_Save, {
        quiz_id: quiz.id,
        answers,
        duration,
    }).then(([err, result]) => {
        if (err) {
            if (err === 'no_login') {
                return dispatch(openLoginModal());
            }
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
export const submitCheckAnswer = () => async (dispatch, getState) => {
    let { statsQuiz, questionsById, answersById } = getState();
    if (!_hasCompleteCheckQuiz(questionsById, answersById)) return alert('请批改完全部试题后再提交');
    let answers = [];
    for (let key in answersById) {
        if (answersById.hasOwnProperty(key)) {
            answers.push(answersById[key]);
        }
    }
    dispatch({ type: UPLOADING_QUESTIONS });
    let [err] = await fetchData(Api.APIURL_Stats_Quiz_Update, {
        stats_quiz_id: statsQuiz.id,
        answers,
    });
    if (err) {
        if (err === 'no_login') {
            return dispatch(openLoginModal());
        }
        return dispatch(networkError(err));
    }
    dispatch({ type: UPLOADED_QUESTIONS });
    location.href = '/tgrammar/stats/list';
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
    is_correct,
}) => dispatch => {
    dispatch({
        type: SAVE_QUESTION1_FEEDBACK_SELECT_ANSWER,
        payload: {
            id,
            is_correct,
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
    is_correct,
}) => dispatch => {
    dispatch({
        type: SAVE_QUESTION3_FEEDBACK_SELECT_ANSWER,
        payload: {
            id,
            is_correct,
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
    let is_stu_operation_visible =
        user && statsQuiz && user.role_id === '3' && statsQuiz.status === '3';
    let is_stu_operation_editable = user && user.role_id === '3' && !statsQuiz;
    let is_tea_operation_visible = user && user.role_id === '2' && statsQuiz;
    let is_tea_operation_editable = user && user.role_id === '2' && statsQuiz;
    return {
        type: UPDATE_OPERATION,
        payload: {
            is_stu_operation_visible,
            is_stu_operation_editable,
            is_tea_operation_visible,
            is_tea_operation_editable,
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
                if (
                    !answer ||
                    typeof answer.select_value !== 'number' ||
                    !answer.text_value
                ) {
                    unCompletedNos.push(questionIndex);
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

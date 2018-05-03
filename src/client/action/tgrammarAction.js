import { fetchData } from '@/service/base';
import {
    APIURL_Stats_Quiz_Reset,
    APIURL_Content_Quiz_Grammar,
    APIURL_Stats_Quiz_Save,
    APIURL_Stats_Quiz_Update,
    APIURL_Stats_Quiz_List,
} from '@/../APIConfig';
import storeUtil from '@/util/storeUtil';
import {
    REQUEST_QUIZ_DATA,
    RECEIVE_QUIZ_DATA,
    SAVE_QUESTION1_SELECT_ANSWER,
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
import { RoleID, CurrentQuizState, StatsQuizStatus } from '@/constant/index';

/**
 * 题目数据 & 答题记录请求
 */
export const fetchQuizData = ({
    quiz_id,
    stats_quiz_id,
    cmd,
}) => async dispatch => {
    dispatch(requestQuizData());
    let [err, result] = await fetchData(APIURL_Content_Quiz_Grammar, {
        quiz_id,
        stats_quiz_id,
    });
    if (err) {
        if (err === 'stats_quiz_not_found') {
            location.href = '/tgrammar/quiz';
        } else {
            dispatch(networkError(err));
        }
        return;
    }
    const { user, quiz, statsQuiz, statsQuizDetail } = result;
    quizDataFix(quiz.data);
    if (
        (user.role_id === RoleID.ADMINISTRATOR ||
            user.role_id === RoleID.TEACHER) &&
        !statsQuiz
    ) {
        location.href = '/tgrammar/stats/list';
        return;
    }
    const currentQuizState = getCurrentQuizState(user, statsQuiz, cmd);
    dispatch(
        receiveQuizData({
            user,
            quiz,
            statsQuiz,
            statsQuizDetail,
            currentQuizState,
        })
    );

    if (currentQuizState === CurrentQuizState.ANSWERING) {
        let localAnswer = hasLocalAnswers(quiz, user);
        if (localAnswer) {
            const text = '检测到有未提交的答题记录，是否恢复？';
            const onConfirm = () => restoreLocalAnswers(localAnswer);
            const onCancel = () => clearLocalAnswers(quiz, user);
            dispatch(openConfirmModal({ text, onConfirm, onCancel }));
        }
        dispatch(recordTime());
    } else if (currentQuizState === CurrentQuizState.WAITING4CHECK) {
        dispatch(openTipModal({ text: '当前老师正在批改中…，请稍候查看结果' }));
    } else if (currentQuizState === CurrentQuizState.CHECKING) {
        dispatch(showDefaultFeedback());
    }
};

/**
 * 准备提交答案
 */
export const preSubmitAnswer = () => (dispatch, getState) => {
    let { questions, answersById } = getState();
    let unCompletedNos = _getUnCompletedNos(questions.byId, answersById);
    if (unCompletedNos.length) {
        let text = `你有第 ${unCompletedNos.join(',')} 题共 ${
            unCompletedNos.length
        } 道题未答，是否确定提交答卷？`;
        return dispatch(openConfirmModal({ text, onConfirm: submitAnswer }));
    }
    dispatch(submitAnswer());
};

/**
 * 提交答案
 */
export const submitAnswer = () => (dispatch, getState) => {
    let { quiz, user, answersById, questions, timer } = getState();
    let duration = Math.round((new Date().getTime() - timer.startTime) / 1000);
    let answers = [];
    questions.allIds.forEach(questionId => {
        let question = questions.byId[questionId];
        if (question.format === 1) {
            let answer = parseFormat1Answer(question, answersById);
            answers.push(answer);
        } else if (question.format === 3) {
            let answer = parseFormat3Answer(question, answersById);
            answers.push(answer);
        }
    });
    dispatch({ type: UPLOADING_QUESTIONS });
    return fetchData(APIURL_Stats_Quiz_Save, {
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
    let { statsQuiz, questions, answersById } = getState();
    if (!_hasCompleteCheckQuiz(questions.byId, answersById)) return alert('请批改完全部试题后再提交');
    let answers = [];
    let score = 0;
    questions.allIds.forEach(questionId => {
        let question = questions.byId[questionId];
        if (question.format === 1) {
            let answer = answersById[questionId];
            if (typeof answer.select_score === 'number') score += answer.select_score;
            answers.push(answer);
        } else if (question.format === 3) {
            let answer = answersById[questionId];
            if (typeof answer.select_score === 'number') score += answer.select_score;
            if (typeof answer.text_score === 'number') score += answer.text_score;
            answers.push(answer);
        }
    });
    dispatch({ type: UPLOADING_QUESTIONS });
    let [err] = await fetchData(APIURL_Stats_Quiz_Update, {
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

/**
 * 重置试卷
 */
export const resetQuiz = () => async (dispatch, getState) => {
    let { statsQuiz } = getState();
    let [err] = await fetchData(APIURL_Stats_Quiz_Reset, {
        stats_quiz_id: statsQuiz.id,
    });
    if (err) {
        if (err === 'no_login') return dispatch(openLoginModal());
        return dispatch(networkError(err));
    }
    dispatch(openTipModal({ text: '该学生试卷已重置成功！' }));
};

/**
 * 当前测试试卷的状态，不同的角色不同的答题记录对应不同的状态
 */
const getCurrentQuizState = (user, statsQuiz, cmd) => {
    if (user.role_id === RoleID.STUDENT) {
        if (statsQuiz) {
            if (statsQuiz.status === StatsQuizStatus.CHECKED) {
                return CurrentQuizState.REVIEWING;
            } else {
                return CurrentQuizState.WAITING4CHECK;
            }
        } else {
            return CurrentQuizState.ANSWERING;
        }
    }
    if (user.role_id === RoleID.TEACHER) {
        if (statsQuiz) {
            if (cmd === 'check') {
                return CurrentQuizState.CHECKING;
            } else {
                return CurrentQuizState.REVIEWING;
            }
        }
    }
    return CurrentQuizState.ANSWERING;
};

/**
 * 老师在批改的时候显示出默认提示
 */
const showDefaultFeedback = () => (dispatch, getState) => {
    let { questions, answersById } = getState();
    for (let question_id in answersById) {
        if (answersById.hasOwnProperty(question_id)) {
            let answer = answersById[question_id];
            if (!answer.feedback) answer.feedback = questions.byId[question_id].feedback;
        }
    }
    dispatch(updateAnswers(answersById));
};

const updateAnswers = answersById => ({
    type: UPDATE_ANSWERS,
    payload: answersById,
});

export const requestQuizData = () => ({
    type: REQUEST_QUIZ_DATA,
});

export const receiveQuizData = ({
    user,
    quiz,
    statsQuiz,
    statsQuizDetail,
    currentQuizState,
}) => {
    return {
        type: RECEIVE_QUIZ_DATA,
        payload: {
            user,
            quiz,
            statsQuiz,
            statsQuizDetail,
            currentQuizState,
        },
    };
};

/**
 * 题号格式化 & fix api 不合理字段命名
 */
const quizDataFix = data => {
    let no = 0;
    data.forEach(question => {
        if (question.format === 1 || question.format === 3) {
            no++;
            question.no = no;
        }
        if (question.answers) {
            question.options = question.answers.map((item, index) => {
                item.value = index;
                return item;
            });
            delete question.answers;
        }
    });
};

const parseFormat1Answer = (question, answersById) => {
    let answer = answersById[question.id] || { question_id: question.id };
    let correct_value;
    question.options.forEach((option, i) => {
        if (option.isCorrect) correct_value = i;
    });
    answer.is_select_correct = answer.select_value === correct_value ? 1 : 0;
    answer.select_score = answer.is_select_correct ? 2 : 0;
    return answer;
};

const parseFormat3Answer = (question, answersById) => {
    let answer = answersById[question.id] || { question_id: question.id };
    answer.is_select_correct =
        (question.isCorrect && answer.select_value === 1) ||
        (!question.isCorrect && answer.select_value === 0)
            ? 1
            : 0;
    if (question.isCorrect) {
        answer.select_score = answer.is_select_correct ? 2 : 0;
        if (answer.select_value === 1) {
            // 选项正确且学生选择正确，无需保存 text_value
            delete answer.text_value;
        }
    } else {
        answer.select_score = answer.is_select_correct ? 1 : 0;
    }
    if (answer.is_select_correct === 0) {
        answer.is_text_correct = 0;
        answer.text_score = 0;
    }
    return answer;
};

const recordTime = () => ({
    type: RECORD_TIME,
    payload: {
        startTime: new Date().getTime(),
    },
});

/**
 * 答题记录列表
 */
export const fetchStatsQuizList = () => async dispatch => {
    dispatch({ type: REQUEST_STATS_QUIZ_LIST });
    let [err, result] = await fetchData(APIURL_Stats_Quiz_List);
    if (err) return dispatch(networkError(err));
    dispatch({ type: RECEIVE_STATS_QUIZ_LIST, payload: result });
};

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
};

export const saveFeedbackText = ({ id, feedback }) => dispatch => {
    dispatch({
        type: SAVE_FEEDBACK_TEXT,
        payload: {
            id,
            feedback,
        },
    });
};

const getLocalAnswersKey = (quiz, user) => `${quiz.id}-${user.id}`;

export const autoSaveLocalAnswers = () => (dispatch, getState) => {
    let { quiz, user, answersById } = getState();
    const key = getLocalAnswersKey(quiz, user);
    storeUtil.set(key, answersById);
};

const hasLocalAnswers = (quiz, user) => {
    const key = getLocalAnswersKey(quiz, user);
    return storeUtil.get(key);
};

const restoreLocalAnswers = answersById => ({
    type: RESTORE_LOCAL_ANSWERS,
    payload: answersById,
});

const clearLocalAnswers = (quiz, user) => dispatch => {
    const key = getLocalAnswersKey(quiz, user);
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

export const closeTipModal = () => ({
    type: CLOSE_TIP_MODAL,
});

export const openTipModal = ({ text }) => ({
    type: OPEN_TIP_MODAL,
    payload: { text },
});

export const closeConfirmModal = () => ({
    type: CLOSE_CONFIRM_MODAL,
});

export const openConfirmModal = ({ text, onConfirm, onCancel }) => ({
    type: OPEN_CONFIRM_MODAL,
    payload: { text, onConfirm, onCancel },
});

export const closeLoginModal = () => ({
    type: CLOSE_LOGIN_MODAL,
});

export const openLoginModal = () => ({
    type: OPEN_LOGIN_MODAL,
});

/**
 * 题目是否全部做完
 * @param {*} questionIds
 * @param {*} answersById
 */
const _getUnCompletedNos = (questionIds, answersById) => {
    let unCompletedNos = [];
    let questionIndex = 0;
    for (let key in questionIds) {
        if (questionIds.hasOwnProperty(key)) {
            let question = questionIds[key];
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

export const showUncompleteQuestion = { type: SHOW_UNCOMPLETED_QUESTION };

export const showAllQuestion = { type: SHOW_ALL_QUESTION };

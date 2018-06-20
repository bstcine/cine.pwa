import { fetchData } from '@/service/base';
import {
    APIURL_Stats_Quiz_Reset,
    APIURL_Content_Quiz,
    APIURL_Stats_Quiz_Save,
    APIURL_Stats_Quiz_Update,
    APIURL_Content_StuQuizWord_List,
} from '@/../APIConfig';
import storeUtil from '@/util/storeUtil';
import {
    REQUEST_CONTENT_QUIZ,
    RECEIVE_CONTENT_QUIZ,
    REQUEST_STATS_QUIZ_SAVE,
    RECEIVE_STATS_QUIZ_SAVE,
    SAVE_QUESTION1_SELECT_VALUE,
    SAVE_QUESTION3_SELECT_VALUE,
    SAVE_QUESTION3_TEXT_VALUE,
    SAVE_QUESTION3_TEXT_SCORE,
    SAVE_QUESTION_FEEDBACK,
    CLOSE_LOGIN_MODAL,
    OPEN_LOGIN_MODAL,
    RESTORE_LOCAL_ANSWERS,
    RECORD_TIME,
    SHOW_UNCOMPLETED_QUESTION,
    SHOW_ALL_QUESTION,
    UPDATE_ANSWERS,
    REQUEST_STATS_QUIZ_UPDATE,
    RECEIVE_STATS_QUIZ_UPDATE,
    REQUEST_STATS_STUDENT_QUIZ_WORD_LIST,
    RECEIVE_STATS_STUDENT_QUIZ_WORD_LIST,
} from '@/constant/actionTypeTGrammar';
import {
    RoleID,
    CurrentQuizState,
    StatsContentQuizStatus,
    QuestionFormat,
} from '@/constant/index';
import { openConfirm, openAlert, networkError } from '@/action/commonAction';

/**
 * 题目数据 & 答题记录请求
 */
export const fetchQuizData = ({
    user_id,
    quiz_id,
    stats_content_quiz_id,
    lesson_id,
    chapter_id,
    course_id,
    cmd,
}) => async dispatch => {
    dispatch(requestQuizData());
    let [err, result] = await fetchData(APIURL_Content_Quiz, {
        user_id,
        quiz_id,
        stats_content_quiz_id,
        lesson_id,
        chapter_id,
        course_id,
    });
    if (err) {
        if (err === 'stats_quiz_not_found') {
            location.href = '/tgrammar/quiz';
        } else {
            dispatch(networkError(err));
        }
        return;
    }
    const { user, quiz, statsContentQuiz, statsContentQuizDetail } = result;
    quizDataFix(quiz.data);
    if (
        (user.role_id === RoleID.ADMINISTRATOR ||
            user.role_id === RoleID.TEACHER) &&
        !statsContentQuiz
    ) {
        location.href = '/teacher/dashboard';
        return;
    }
    const currentQuizState = getCurrentQuizState(user, statsContentQuiz, cmd);
    dispatch(
        receiveQuizData({
            user,
            quiz,
            statsContentQuiz,
            statsContentQuizDetail,
            currentQuizState,
        })
    );

    if (currentQuizState === CurrentQuizState.ANSWERING) {
        let localAnswer = hasLocalAnswers(quiz, user);
        if (localAnswer) {
            const text = '检测到有未提交的答题记录，是否恢复？';
            const onConfirm = () => {
                dispatch(restoreLocalAnswers(localAnswer));
            };
            const onCancel = () => {
                clearLocalAnswers(quiz, user);
            };
            dispatch(openConfirm({ text, onConfirm, onCancel }));
        }
        dispatch(recordTime());
    } else if (currentQuizState === CurrentQuizState.WAITING4CHECK) {
        dispatch(
            openAlert({
                text:
                    '试卷已提交，正在等待老师阅卷。批改完成后，老师会与直接您联系。',
            })
        );
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
    let text;
    if (unCompletedNos.length) {
        text = `您共有${
            unCompletedNos.length
        }题尚未作答，是否确认提交？提交后不能再修改。\n\n尚未作答的题目：第${unCompletedNos.join(
            '、'
        )}题`;
        return dispatch(
            openConfirm({
                text,
                onConfirm: () => {
                    dispatch(submitAnswer());
                },
            })
        );
    } else {
        text = '您已作答完毕，是否确认提交？提交后不能再修改';
    }
    return dispatch(
        openConfirm({
            text,
            onConfirm: () => {
                dispatch(submitAnswer());
            },
        })
    );
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
        if (question.format === QuestionFormat.FORMAT1_CHOOSE_ONE) {
            let answer = parseFormat1Answer(question, answersById);
            answers.push(answer);
        } else if (question.format === QuestionFormat.FORMAT3_CORRECT) {
            let answer = parseFormat3Answer(question, answersById);
            answers.push(answer);
        }
    });
    dispatch({ type: REQUEST_STATS_QUIZ_SAVE });
    return fetchData(APIURL_Stats_Quiz_Save, {
        quiz_id: quiz.id,
        answers,
        duration,
    }).then(([err, result]) => {
        if (err) {
            if (err === 'no_login') return dispatch(openLoginModal());
            return dispatch(networkError(err));
        }
        dispatch({ type: RECEIVE_STATS_QUIZ_SAVE });
        clearLocalAnswers(quiz, user);
        location.href = `/tgrammar/quiz?stats_content_quiz_id=${
            result.statsContentQuiz.id
        }`;
    });
};

/**
 * 提交批改记录
 */
export const submitCheckAnswer = (complete = true) => async (
    dispatch,
    getState
) => {
    let { statsContentQuiz, questions, answersById } = getState();
    if (!_hasCompleteCheckQuiz(questions.byId, answersById)) return alert('请批改完全部试题后再提交');
    let answers = [];
    let score = 0;
    questions.allIds.forEach(questionId => {
        let question = questions.byId[questionId];
        if (question.format === QuestionFormat.FORMAT1_CHOOSE_ONE) {
            let answer = answersById[questionId];
            if (typeof answer.select_score === 'number') score += answer.select_score;
            answers.push(answer);
        } else if (question.format === QuestionFormat.FORMAT3_CORRECT) {
            let answer = answersById[questionId];
            if (typeof answer.select_score === 'number') score += answer.select_score;
            if (typeof answer.text_score === 'number') score += answer.text_score;
            answers.push(answer);
        }
    });
    dispatch({ type: REQUEST_STATS_QUIZ_UPDATE });
    let [err] = await fetchData(APIURL_Stats_Quiz_Update, {
        stats_content_quiz_id: statsContentQuiz.id,
        answers,
        complete,
        score,
    });
    if (err) {
        if (err === 'no_login') return dispatch(openLoginModal());
        return dispatch(networkError(err));
    }
    dispatch({ type: RECEIVE_STATS_QUIZ_UPDATE });
    location.href = '/teacher/dashboard';
};

/**
 * 重置试卷
 */
export const resetQuiz = () => (dispatch, getState) => {
    return dispatch(
        openConfirm({
            text: '是否确认重置？重置后将清空学生的所有作答记录。',
            onConfirm: async () => {
                let { statsContentQuiz } = getState();
                let [err] = await fetchData(APIURL_Stats_Quiz_Reset, {
                    stats_content_quiz_id: statsContentQuiz.id,
                });
                if (err) {
                    if (err === 'no_login') return dispatch(openLoginModal());
                    return dispatch(networkError(err));
                }
                dispatch(openAlert({ text: '该学生试卷已重置成功！' }));
            },
        })
    );
};

/**
 * 获取学生、答题记录、词汇测试列表
 */
export const fetchStatsContentStuQuizWordList = () => async dispatch => {
    dispatch({ type: REQUEST_STATS_STUDENT_QUIZ_WORD_LIST });
    let [err, result] = await fetchData(APIURL_Content_StuQuizWord_List);
    if (err) return dispatch(networkError(err));
    dispatch({ type: RECEIVE_STATS_STUDENT_QUIZ_WORD_LIST, payload: result });
};

// /**
//  * 答题记录列表
//  */
// export const fetchStatsContentQuizList = () => async dispatch => {
//     dispatch({ type: REQUEST_STATS_QUIZ_LIST });
//     let [err, result] = await fetchData(APIURL_Stats_Quiz_List);
//     if (err) return dispatch(networkError(err));
//     dispatch({ type: RECEIVE_STATS_QUIZ_LIST, payload: result });
// };
//
// /**
//  * 词汇测试列表
//  */
// export const fetchStatsContentWordList = () => async dispatch => {
//     dispatch({ type: REQUEST_STATS_WORD_LIST });
//     let [err, result] = await fetchData(APIURL_Content_Word_Result_List);
//     if (err) return dispatch(networkError(err));
//     dispatch({ type: RECEIVE_STATS_WORD_LIST, payload: result });
// };

/**
 * 当前测试试卷的状态，不同的角色不同的答题记录对应不同的状态
 */
const getCurrentQuizState = (user, statsContentQuiz, cmd) => {
    if (user.role_id === RoleID.STUDENT) {
        if (statsContentQuiz) {
            if (statsContentQuiz.status === StatsContentQuizStatus.CHECKED) {
                return CurrentQuizState.REVIEWING;
            } else {
                return CurrentQuizState.WAITING4CHECK;
            }
        } else {
            return CurrentQuizState.ANSWERING;
        }
    }
    if (
        user.role_id === RoleID.TEACHER ||
        user.role_id === RoleID.ADMINISTRATOR
    ) {
        if (statsContentQuiz) {
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
    type: REQUEST_CONTENT_QUIZ,
});

export const receiveQuizData = ({
    user,
    quiz,
    statsContentQuiz,
    statsContentQuizDetail,
    currentQuizState,
}) => {
    return {
        type: RECEIVE_CONTENT_QUIZ,
        payload: {
            user,
            quiz,
            statsContentQuiz,
            statsContentQuizDetail,
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
        if (question.type) {
            question.format =
                question.type === '1'
                    ? QuestionFormat.FORMAT1_CHOOSE_ONE
                    : question.type === '3'
                        ? QuestionFormat.FORMAT4_SHORT_QUE
                        : '';
        }

        if (question.options) {
            let options = JSON.parse(question.options);
            question.options = options.map((item, index) => {
                item.value = index;
                item.isCorrect = String(index) === question.answer;
                return item;
            });
        }

        if (
            question.format === QuestionFormat.FORMAT1_CHOOSE_ONE ||
            question.format === QuestionFormat.FORMAT3_CORRECT ||
            question.format === QuestionFormat.FORMAT4_SHORT_QUE
        ) {
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

export const saveQuestion1SelectValue = ({ id, select_value }) => dispatch => {
    dispatch({
        type: SAVE_QUESTION1_SELECT_VALUE,
        payload: {
            id,
            select_value,
        },
    });
    dispatch(autoSaveLocalAnswers());
};

export const saveQuestion3SelectValue = ({ id, select_value }) => dispatch => {
    dispatch({
        type: SAVE_QUESTION3_SELECT_VALUE,
        payload: {
            id,
            select_value,
        },
    });
    dispatch(autoSaveLocalAnswers());
};

export const saveQuestion3TextValue = ({ id, text_value }) => dispatch => {
    dispatch({
        type: SAVE_QUESTION3_TEXT_VALUE,
        payload: {
            id,
            text_value,
        },
    });
    dispatch(autoSaveLocalAnswers());
};

export const saveQuestion3TextScore = ({ id, is_text_correct }) => dispatch => {
    dispatch({
        type: SAVE_QUESTION3_TEXT_SCORE,
        payload: {
            id,
            is_text_correct,
            text_score: is_text_correct ? 1 : 0,
        },
    });
};

export const saveQuestionFeedback = ({ id, feedback }) => dispatch => {
    dispatch({
        type: SAVE_QUESTION_FEEDBACK,
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

const clearLocalAnswers = (quiz, user) => {
    const key = getLocalAnswersKey(quiz, user);
    storeUtil.remove(key);
};

export const closeLoginModal = () => ({
    type: CLOSE_LOGIN_MODAL,
});

export const openLoginModal = () => ({
    type: OPEN_LOGIN_MODAL,
});

export const showUncompletedQuestion = { type: SHOW_UNCOMPLETED_QUESTION };

export const showAllQuestion = { type: SHOW_ALL_QUESTION };

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
            if (question.format === QuestionFormat.FORMAT1_CHOOSE_ONE) {
                questionIndex++;
                let answer = answersById[key];
                if (!answer || typeof answer.select_value !== 'number') {
                    unCompletedNos.push(questionIndex);
                }
            } else if (question.format === QuestionFormat.FORMAT3_CORRECT) {
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

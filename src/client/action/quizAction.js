import {
    APIURL_Stats_Quiz_Reset,
    APIURL_Content_Quiz,
    APIURL_Stats_Quiz_Save,
    APIURL_Stats_Quiz_Update,
} from '@/../APIConfig';
import storeUtil from '@/util/_base/storeUtil';
import {
    RECEIVE_CONTENT_QUIZ,
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
import {
    CurrentQuizState,
    StatsContentQuizStatus,
    QuestionFormat,
} from '@/constant/quiz';
import { RoleID } from '@/constant/index';
import { superFetchDataWithShowLogin } from '@/action/commonAction';
import { CMessage, CAlert } from '@/component/_base';

/**
 * 题目数据 & 答题记录请求
 */
export const fetchQuizData = ({
    user_id,
    task_schedule_id,
    quiz_id,
    stats_content_quiz_id,
    lesson_id,
    chapter_id,
    course_id,
    cmd,
}) => async dispatch => {
    let [err, result] = await dispatch(
        superFetchDataWithShowLogin(
            APIURL_Content_Quiz,
            {
                user_id,
                task_schedule_id,
                quiz_id,
                stats_content_quiz_id,
                lesson_id,
                chapter_id,
                course_id,
            },
            { showError: false }
        )
    );
    if (err) {
        if (
            err === 'stats_quiz_not_found' &&
            !location.href.includes('/quiz/kj')
        ) {
            location.href = '/quiz/grammar';
        } else {
            CMessage.error(err);
        }
        return;
    }
    const { user, quiz, statsContentQuiz, statsContentQuizDetail } = result;

    if (
        location.href.includes('/quiz/kj') &&
        (!quiz || (quiz && quiz.type === '2'))
    ) {
        CMessage.error('not_quiz_kj');
        return;
    }

    quizDataFix(quiz.data);

    const currentQuizState = getCurrentQuizState(user, statsContentQuiz, cmd);
    const taskScheduleId = result.taskScheduleId || '';
    dispatch(
        receiveQuizData({
            user,
            quiz,
            statsContentQuiz,
            statsContentQuizDetail,
            currentQuizState,
            taskScheduleId,
        })
    );

    if (currentQuizState === CurrentQuizState.ANSWERING) {
        let localAnswer = hasLocalAnswers(quiz, user);
        if (localAnswer) {
            CAlert.open({
                text: '检测到有未提交的答题记录，是否恢复？',
                onConfirm: () => {
                    dispatch(restoreLocalAnswers(localAnswer));
                },
                onCancel: () => {
                    clearLocalAnswers(quiz, user);
                },
            });
        }
        dispatch(recordTime());
    } else if (currentQuizState === CurrentQuizState.WAITING4CHECK) {
        CAlert.open({
            text: '试卷已提交，正在等待老师阅卷。',
        });
    } else if (currentQuizState === CurrentQuizState.CHECKING) {
        dispatch(showDefaultFeedback());
    }
};

/**
 * 准备提交答案
 */
export const preSubmitAnswer = () => (dispatch, getState) => {
    let { quiz, questions, answersById } = getState();
    let unCompletedNos = _getUnCompletedNos(questions.byId, answersById);

    if (['1', '3'].includes(quiz.type)) {
        if (unCompletedNos.length) {
            CAlert.open({
                text: `您共有${
                    unCompletedNos.length
                }题尚未作答，请作答完后再提交。\n\n尚未作答的题目：第${unCompletedNos.join(
                    '、'
                )}题`,
            });
            return;
        } else {
            CAlert.open({
                text: '您已作答完毕，是否确认提交？提交后不能再修改',
                onConfirm: () => {
                    dispatch(submitAnswer());
                },
            });
            return;
        }
    } else {
        if (unCompletedNos.length) {
            CAlert.open({
                text: `您共有${
                    unCompletedNos.length
                }题尚未作答，是否确认提交？提交后不能再修改。\n\n尚未作答的题目：第${unCompletedNos.join(
                    '、'
                )}题`,
                onConfirm: () => {
                    dispatch(submitAnswer());
                },
            });
            return;
        } else {
            CAlert.open({
                text: '您已作答完毕，是否确认提交？提交后不能再修改',
                onConfirm: () => {
                    dispatch(submitAnswer());
                },
            });
            return;
        }
    }
};

/**
 * 提交答案
 */
export const submitAnswer = () => async (dispatch, getState) => {
    let {
        quiz,
        userRedu,
        answersById,
        questions,
        timer,
        taskScheduleId,
    } = getState();
    let duration = Math.round((new Date().getTime() - timer.startTime) / 1000);
    let answers = [];
    let score = 0;
    questions.allIds.forEach(questionId => {
        let question = questions.byId[questionId];
        if (question.format === QuestionFormat.FORMAT1_CHOOSE_ONE) {
            let answer = parseFormat1Answer(question, answersById);
            if (quiz.type === '2') {
                if (typeof answer.select_score === 'number') {
                    score += answer.select_score;
                    answer.feedback = questions.byId[questionId].feedback;
                }
            }
            answers.push(answer);
        } else if (question.format === QuestionFormat.FORMAT3_CORRECT) {
            let answer = parseFormat3Answer(question, answersById);
            if (quiz.type === '2') {
                if (typeof answer.select_score === 'number')
                    score += answer.select_score;
                if (typeof answer.text_score === 'number')
                    score += answer.text_score;
                answer.feedback = questions.byId[questionId].feedback;
            }
            answers.push(answer);
        } else if (question.format === QuestionFormat.FORMAT4_SHORT_QUE) {
            let answer = parseFormat4Answer(question, answersById);
            answers.push(answer);
        }
    });
    // dispatch({ type: REQUEST_STATS_QUIZ_SAVE });
    let [err] = await dispatch(
        superFetchDataWithShowLogin(
            APIURL_Stats_Quiz_Save,
            {
                quiz_id: quiz.id,
                answers,
                duration,
                score,
                task_schedule_id: taskScheduleId,
            },
            { showError: false }
        )
    );
    if (err) {
        if (err === 'no_login') return dispatch(openLoginModal());
        CMessage.error(err);
        return;
    }
    clearLocalAnswers(quiz, userRedu.data || {});
    window.location.reload();
};

/**
 * 提交批改记录
 */
export const submitCheckAnswer = (complete = true) => async (
    dispatch,
    getState
) => {
    let { statsContentQuiz, questions, answersById } = getState();
    if (!_hasCompleteCheckQuiz(questions.byId, answersById))
        return alert('请批改完全部试题后再提交');
    let answers = [];
    let score = 0;
    questions.allIds.forEach(questionId => {
        let question = questions.byId[questionId];
        if (question.format === QuestionFormat.FORMAT1_CHOOSE_ONE) {
            let answer = answersById[questionId];
            if (typeof answer.select_score === 'number')
                score += answer.select_score;
            answers.push(answer);
        } else if (question.format === QuestionFormat.FORMAT3_CORRECT) {
            let answer = answersById[questionId];
            if (typeof answer.select_score === 'number')
                score += answer.select_score;
            if (typeof answer.text_score === 'number')
                score += answer.text_score;
            answers.push(answer);
        } else if (question.format === QuestionFormat.FORMAT4_SHORT_QUE) {
            let answer = answersById[questionId];
            if (typeof answer.select_score === 'number')
                score += answer.select_score;
            if (typeof answer.text_score === 'number')
                score += answer.text_score;
            answers.push(answer);
        }
    });
    let [err] = await dispatch(
        superFetchDataWithShowLogin(
            APIURL_Stats_Quiz_Update,
            {
                stats_content_quiz_id: statsContentQuiz.id,
                answers,
                complete,
                score,
            },
            { showError: false }
        )
    );
    if (err) {
        if (err === 'no_login') return dispatch(openLoginModal());
        CMessage.error(err);
        return;
    }
    // dispatch({ type: RECEIVE_STATS_QUIZ_UPDATE });
    location.href = '/mentor';
};

/**
 * 重置试卷
 */
export const resetQuiz = () => (dispatch, getState) => {
    CAlert.open({
        text: '是否确认重置？重置后将清空学生的所有作答记录。',
        onConfirm: async () => {
            let { statsContentQuiz } = getState();
            let [err] = await dispatch(
                superFetchDataWithShowLogin(
                    APIURL_Stats_Quiz_Reset,
                    {
                        stats_content_quiz_id: statsContentQuiz.id,
                    },
                    { showError: false }
                )
            );
            if (err) {
                if (err === 'no_login') return dispatch(openLoginModal());
                CMessage.error(err);
                return;
            }
            CAlert.open({ text: '该学生试卷已重置成功！' });
        },
    });
};

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
            if (!answer.feedback)
                answer.feedback = questions.byId[question_id].feedback;
        }
    }
    dispatch(updateAnswers(answersById));
};

const updateAnswers = answersById => ({
    type: UPDATE_ANSWERS,
    payload: answersById,
});

export const receiveQuizData = ({
    user,
    quiz,
    statsContentQuiz,
    statsContentQuizDetail,
    currentQuizState,
    taskScheduleId,
}) => {
    return {
        type: RECEIVE_CONTENT_QUIZ,
        payload: {
            user,
            quiz,
            statsContentQuiz,
            statsContentQuizDetail,
            currentQuizState,
            taskScheduleId,
        },
    };
};

/**
 * 题号格式化 & fix api 不合理字段命名
 */
const quizDataFix = data => {
    let no = 0;
    data.forEach(question => {
        // 将最新的习题格式转为旧格式 start
        if (question.type) {
            question.format =
                question.type === '1'
                    ? QuestionFormat.FORMAT1_CHOOSE_ONE
                    : question.type === '3'
                    ? QuestionFormat.FORMAT4_SHORT_QUE
                    : '';
        }
        if (question.steam) question.title = question.steam;
        if (question.analysis) question.feedback = question.analysis;
        if (question.options) {
            let options = JSON.parse(question.options);
            question.options = options.map((item, index) => {
                item.value = index;
                item.isCorrect = String(index) === question.answer;
                return item;
            });
        }
        // 将最新的习题格式转为旧格式 end

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
        // 默认需要批改
        if (!question.need_feedback) question.need_feedback = '1';
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

const parseFormat4Answer = (question, answersById) => {
    let answer = answersById[question.id] || { question_id: question.id };

    // 两头去空
    if (answer && answer.text_value) {
        answer.text_value = answer.text_value.replace(/^\s+|\s+$/g, '');
    }

    // todo 简答题得分
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

export const saveQuestion4TextValue = ({ id, text_value }) => dispatch => {
    dispatch({
        type: SAVE_QUESTION4_TEXT_VALUE,
        payload: {
            id,
            text_value,
        },
    });
    dispatch(autoSaveLocalAnswers());
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
    let { quiz, userRedu, answersById } = getState();
    const key = getLocalAnswersKey(quiz, userRedu.data || {});
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
            } else if (question.format === QuestionFormat.FORMAT4_SHORT_QUE) {
                questionIndex++;
                let answer = answersById[key];
                if (!answer) {
                    unCompletedNos.push(questionIndex);
                } else {
                    if (!answer.text_value) {
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

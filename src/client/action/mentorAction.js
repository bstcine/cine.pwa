import {
    APIURL_Content_StuQuizWord_List,
    APIURL_Mentor_Student_ListWithTask,
    APIURL_Content_Task_Update_Status,
} from '../../APIConfig';
import {
    FETCH_MENTOR_STUDENT_QUIZ_WORD,
    FETCH_MENTOR_STUDENT_TASK,
} from '@/constant/actionTypeMentor';
import { superFetchDataWithShowLogin } from '@/action/commonAction';
import { CAlert } from '@/component/_base';

/**
 * 获取学生、答题记录、词汇测试列表
 */
export const fetchMentorStudentQuizWord = () => async dispatch => {
    let [err, result] = await dispatch(
        superFetchDataWithShowLogin(APIURL_Content_StuQuizWord_List)
    );
    if (!err) {
        dispatch({ type: FETCH_MENTOR_STUDENT_QUIZ_WORD, payload: result });
    }
};

/**
 * 获取学生作业
 */
export const fetchMentorStudentTask = () => async dispatch => {
    let [err, result] = await dispatch(
        superFetchDataWithShowLogin(APIURL_Mentor_Student_ListWithTask)
    );
    if (!err) {
        dispatch({ type: FETCH_MENTOR_STUDENT_TASK, payload: result });
    }
};

/**
 * 确认学生pdf作业
 */
export const fetchMentorCorrectPdfTask = task => dispatch => {
    const text = '确认将该学生的PDF习题任务状态标志为已完成？';
    const onConfirm = async () => {
        let [error] = await dispatch(
            superFetchDataWithShowLogin(APIURL_Content_Task_Update_Status, {
                cid: task.id,
                status: '2',
            })
        );
        if (!error) dispatch(fetchMentorStudentTask());
    };
    CAlert.open({ text, onConfirm });
};

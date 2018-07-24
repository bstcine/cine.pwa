import {
    APIURL_Content_StuQuizWord_List,
    APIURL_Mentor_Student_ListWithTask,
    APIURL_Content_Task_Update_Status,
} from '../../APIConfig';
import {
    FETCH_MENTOR_STUDENT_QUIZ_WORD,
    FETCH_MENTOR_STUDENT_TASK,
} from '@/constant/actionTypeMentor';
import { fetchData } from '@/service/base';
import { openConfirm, toastAction } from '@/action/commonAction';

/**
 * 获取学生、答题记录、词汇测试列表
 */
export const fetchMentorStudentQuizWord = () => async dispatch => {
    dispatch(toastAction._loading());
    let [err, result] = await fetchData(APIURL_Content_StuQuizWord_List);
    dispatch(toastAction._hide());
    if (err) {
        dispatch(toastAction.showError(err));
    } else {
        dispatch({ type: FETCH_MENTOR_STUDENT_QUIZ_WORD, payload: result });
    }
};

/**
 * 获取学生作业
 */
export const fetchMentorStudentTask = () => async dispatch => {
    dispatch(toastAction._loading());
    let [err, result] = await fetchData(APIURL_Mentor_Student_ListWithTask);
    dispatch(toastAction._hide());
    if (err) {
        dispatch(toastAction.showError(err));
    } else {
        dispatch({ type: FETCH_MENTOR_STUDENT_TASK, payload: result });
    }
};

/**
 * 确认学生pdf作业
 */
export const fetchMentorCorrectPdfTask = task => dispatch => {
    const text = '确认将该学生的PDF习题任务状态标志为已完成？';
    const onConfirm = async () => {
        let [error] = await fetchData(APIURL_Content_Task_Update_Status, {
            cid: task.id,
            status: '2',
        });

        if (!error) dispatch(fetchMentorStudentTask());
    };
    dispatch(openConfirm({ text, onConfirm }));
};

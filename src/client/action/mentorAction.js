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
import { openConfirm, boundFetchNetwork } from '@/action/commonAction';

/**
 * 获取学生、答题记录、词汇测试列表
 */
export const fetchMentorStudentQuizWord = () => async dispatch => {
    // dispatch(openNetworkLoading());
    // let [err, result] = await fetchData(APIURL_Content_StuQuizWord_List);
    // dispatch(closeNetworkLoading());
    // dispatch(boundNetworkError(err));
    // dispatch({ type: FETCH_MENTOR_STUDENT_QUIZ_WORD, payload: result });
    dispatch(
        boundFetchNetwork(APIURL_Content_StuQuizWord_List, null, {
            dispatchActionType: FETCH_MENTOR_STUDENT_QUIZ_WORD,
        })
    );
};

/**
 * 获取学生作业
 */
export const fetchMentorStudentTask = () => async dispatch => {
    dispatch(
        boundFetchNetwork(APIURL_Mentor_Student_ListWithTask, null, {
            dispatchActionType: FETCH_MENTOR_STUDENT_TASK,
        })
    );

    // let [error, result] = await dispatch(
    //     boundFetchNetwork(APIURL_Mentor_Student_ListWithTask, null, {
    //         showLoading: true,
    //         showError: true,
    //     })
    // );
    // if (!error) dispatch({ type: FETCH_MENTOR_STUDENT_TASK, payload: result });
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

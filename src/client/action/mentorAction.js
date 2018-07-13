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
import { networkFetch, openConfirm } from '@/action/commonAction';

/**
 * 获取学生、答题记录、词汇测试列表
 */
export const fetchMentorStudentQuizWord = () => async dispatch => {
    dispatch(
        networkFetch(
            FETCH_MENTOR_STUDENT_QUIZ_WORD,
            APIURL_Content_StuQuizWord_List
        )
    );
};

/**
 * 获取学生作业
 */
export const fetchMentorStudentTask = () => async dispatch => {
    dispatch(
        networkFetch(
            FETCH_MENTOR_STUDENT_TASK,
            APIURL_Mentor_Student_ListWithTask
        )
    );
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

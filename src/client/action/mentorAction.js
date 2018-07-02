import {
    APIURL_Content_StuQuizWord_List,
    APIURL_Mentor_Student_ListWithTask,
} from '../../APIConfig';
import {
    FETCH_MENTOR_STUDENT_QUIZ_WORD,
    FETCH_MENTOR_STUDENT_TASK,
} from '@/constant/actionTypeMentor';
import { networkFetch } from '@/action/commonAction';

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

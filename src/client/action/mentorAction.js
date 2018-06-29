import {
    APIURL_Content_StuQuizWord_List,
    APIURL_Mentor_Student_ListWithTask,
} from '../../APIConfig';
import { fetchData } from '@/service/base';
import {
    REQUEST_STATS_STUDENT_QUIZ_WORD_LIST,
    RECEIVE_STATS_STUDENT_QUIZ_WORD_LIST,
    FETCH_MENTOR_STUDENT_TASK,
} from '@/constant/actionTypeMentor';
import { networkFetch, networkError } from '@/action/commonAction';

/**
 * 获取学生、答题记录、词汇测试列表
 */
export const fetchStatsContentStuQuizWordList = () => async dispatch => {
    dispatch({ type: REQUEST_STATS_STUDENT_QUIZ_WORD_LIST });
    let [err, result] = await fetchData(APIURL_Content_StuQuizWord_List);
    if (err) return dispatch(networkError(err));
    dispatch({ type: RECEIVE_STATS_STUDENT_QUIZ_WORD_LIST, payload: result });
};

export const fetchMentorStudentTask = () => async dispatch => {
    dispatch(
        networkFetch(
            FETCH_MENTOR_STUDENT_TASK,
            APIURL_Mentor_Student_ListWithTask
        )
    );
};

import * as actionType from '@/constant/actionTypeLWord';
// import * as wordQuiz from '@/service/data/response_word.json';
import Api from '../../APIConfig';
import { fetchData } from '@/service/base';

export const wCourseAction = {
    _init: result => ({
        type: actionType.WC_Init_Course,
        payload: result,
    }),

    _receive: result => ({
        type: actionType.WC_Request_User_Word_Learn_Detail,
        payload: result,
    }),

    initCourseLessons: param => dispatch => {
        if (
            !param.start_index ||
            (parseInt(param.start_index, 10) === 1 &&
                parseInt(param.range, 10) === 3000)
        ) return;

        const lastVisitID = param.last_index
            ? param.last_index
            : param.start_index;
        const payload = {
            wordStartID: param.start_index,
            wordCount: param.range,
            lastVisitID: lastVisitID ? lastVisitID : param.start_index,
        };
        dispatch(wCourseAction._init(payload));
    },

    loadUserWordLearnAndQuiz: param => async dispatch => {
        const wordParam = {
            location: param.start_index ? param.start_index : 1,
            count: param.range ? param.range : 3000,
        };
        const [err, result] = await fetchData(Api.APIURL_User_Word, wordParam);
        if (!result) {
            console.log(err);
            return;
        }

        // 如果没有测试数据&没有查看记录就不需要dispatch（Re-render)
        const lvID = param.last_index ? param.last_index : result.lastVisitID;
        if (
            result.rows.length === 0 &&
            (lvID === 1 || lvID === 3001 || lvID === 6001)
        ) return;

        const payload = {
            lastVisitID: lvID,
            wordStartID: wordParam.location,
            wordCount: wordParam.count,
            wordQuizResult: result.rows,
        };
        dispatch(wCourseAction._receive(payload));

        // 最近查看的Lesson显示在当前窗口
        setTimeout(() => {
            // window.scrollTo(0, 0);
            const ele = document.querySelector(`#l${payload.lastVisitID}`);
            if (ele) {
                const scrollY =
                    ele.getBoundingClientRect().top +
                    document.documentElement.scrollTop;
                window.scrollTo(0, scrollY - 100);
            }
        }, 500);
    },
};

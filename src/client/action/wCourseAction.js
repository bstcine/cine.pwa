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
        if (!param.start_index || param.start_index === 1) return;

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
        const payload = {
            wordStartID: param.start_index ? param.start_index : 1,
            wordCount: param.range ? param.range : 3000,
            lastVisitID: param.last_index,
        };
        let wordParam = {
            location: payload.wordStartID,
            count: payload.wordCount,
        };
        let [err, result] = await fetchData(Api.APIURL_User_Word, wordParam);
        if (!result) {
            console.log(err);
            return;
        }
        if (!payload.lastVisitID) {
            payload.lastVisitID = result.lastVisitID;
        }
        if (result.rows && result.rows.length > 0) {
            payload.result = result.rows;
            dispatch(wCourseAction._receive(payload));
        }
        if (!payload.lastVisitID || payload.lastVisitID === param.start_index) {
            return;
        }
        setTimeout(() => {
            // window.scrollTo(0, 0);
            const ele = document.querySelector(`#l${payload.lastVisitID}`);
            if (ele) {
                const scrollY =
                    ele.getBoundingClientRect().top +
                    document.documentElement.scrollTop;
                window.scrollTo(0, scrollY - 100);
            }
        }, 1000);
    },
};

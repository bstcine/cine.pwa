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

        const lastVisitID = param.last_index ? param.last_index : param.start_index;
        const payload = {
            wordStartID: param.start_index,
            wordCount: param.range,
            lastVisitID: lastVisitID ? lastVisitID : 1,
        };
        dispatch(wCourseAction._init(payload));
    },

    loadUserWordLearnAndQuiz: param => async dispatch => {
        const payload = {
            wordStartID: param.start_index ? param.start_index : 1,
            wordCount: param.range ? param.range : 3000,
        };
        let wordParam = {
            location: payload.wordStartID,
            count: payload.wordCount,
        };
        let [err, result] = await fetchData(Api.APIURL_User_Word, wordParam);
        if (result) {
            payload.result = result.rows;
            payload.lastVisitID = param.last_index ? param.last_index : result.lastVisitID;
            console.log(result);
        } else {
            console.log(err);
        }
        dispatch(wCourseAction._receive(payload));
    },
};

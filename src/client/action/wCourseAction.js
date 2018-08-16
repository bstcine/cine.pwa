import * as actionType from '@/constant/actionTypeLWord';
import * as wordQuiz from '@/service/data/response_word.json';

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
            lastVisitID: param.last_index ? param.last_index : wordQuiz.lastVisitID,
            result: wordQuiz.result,
        };
        dispatch(wCourseAction._receive(payload));
    },
};

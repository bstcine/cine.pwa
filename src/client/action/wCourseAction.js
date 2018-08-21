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
        const lastVisitID = param.last_index
            ? parseInt(param.last_index, 10)
            : wordQuiz.lastVisitID;

        const payload = {
            wordStartID: param.start_index ? param.start_index : 1,
            wordCount: param.range ? param.range : 3000,
            lastVisitID: lastVisitID,
            result: wordQuiz.result,
        };
        dispatch(wCourseAction._receive(payload));

        setTimeout(() => {
            // window.scrollTo(0, 0);
            const ele = document.querySelector(`#l${lastVisitID}`);
            if (ele) {
                const scrollY =
                    ele.getBoundingClientRect().top +
                    document.documentElement.scrollTop;
                window.scrollTo(0, scrollY - 100);
            }
        }, 1000);
    },
};

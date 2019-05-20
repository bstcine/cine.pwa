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
                parseInt(param.range, 10) === 10000)
        )
            return;

        if (param.dict_category_id) return;

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
        const query = param.dict_category_id
            ? { dict_category_id: param.dict_category_id, courseType: '2' }
            : {
                  location: param.start_index ? param.start_index : 1,
                  count: param.range ? param.range : 10000,
              };
        const [err, result] = await fetchData(Api.APIURL_User_Word, query);
        if (!result) {
            console.log(err);
            return;
        }

        // 如果没有测试数据&没有查看记录就不需要dispatch（Re-render)
        const lvID = param.last_index ? param.last_index : result.lastVisitID;
        if (
            result.rows &&
            result.rows.length === 0 &&
            lvID === 0 &&
            !param.dict_category_id
        )
            return;

        const payload = {
            lastVisitID: lvID,
            wordStartID: query.location,
            wordCount: query.count,
            wordQuizResult: result.rows,
            dictCategoryList: result.dictCategoryList,
            name: result.name || '善恩核心10000词汇',
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
                window.scrollTo(0, scrollY - 200);
            }
        }, 500);
    },
};

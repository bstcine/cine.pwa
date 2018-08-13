import { fromJS } from 'immutable';
import * as actionType from '@/constant/actionTypeLWord';

const getCourseItems = (courseID, indexLast, userQuizRows) => {
    const indexStart = 3001;
    const wordCount = 3000;
    const lastVisitID = 1 + parseInt((indexLast - indexStart) / 50, 10);

    let items = [];
    for (let i = 0; i < wordCount / 50; i++) {
        const id = i + 1;
        const _from = indexStart + i * 50;
        const value = _from + '-' + (_from + 49);
        const wQuizScore = -1;
        const wKnownCount = 0;
        const isLastVisit = id === lastVisitID;

        const item = {
            id,
            value,
            wQuizScore,
            wKnownCount,
            isLastVisit,
        };
        items.push(item);
    }

    return items;
};

const initWordCourse = fromJS({
    userID: null,
    courseID: '3001-3000',
    lastVisitID: 502,
    rows: getCourseItems('3001-3000', 3502),
});

const WordCourseRedu = (state = initWordCourse, action) => {
    switch (action.type) {
        case actionType.WC_Init_Course: {
            state.set('courseID', action.payload);
            const newRows = [];
            return state.set('rows', newRows);
        }
        case actionType.WC_Request_User_Learn_Detail:
            return state.set('rows', action.payload);
        default:
            return state;
    }
};

export default WordCourseRedu;

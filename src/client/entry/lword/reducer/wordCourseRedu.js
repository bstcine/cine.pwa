import { fromJS } from 'immutable';
import * as actionType from '@/constant/actionTypeLWord';

const getCourseItems = (courseID, lastID, userQuizRows) => {
    const indexStart = 1;
    const indexEnd = 3000;
    const startedCount = indexStart - 1;
    const lastVisitID = 1 + 50 * lastID / 50;

    let items = [];
    for (let i = 0; i < indexEnd / 50; i++) {
        const id = startedCount + i * 50 + 1;
        const wQuizScore = -1;
        const wKnownCount = 0;
        const isLastVisit = id === lastVisitID;

        const item = {
            id,
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
    courseID: '1-3000',
    lastVisitID: 502,
    rows: getCourseItems('1-3000', 502),
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

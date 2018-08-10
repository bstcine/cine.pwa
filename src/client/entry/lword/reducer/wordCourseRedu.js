import { fromJS } from 'immutable';
import * as actionType from '@/constant/actionTypeLWord';

const initWordCourse = fromJS({
    userID: null,
    courseID: '1-3000',
    lastVisitID: 502,
    rows: [
        {
            id: 1,
            wQuizScore: -1,
            wKnownCount: 0,
            isLastVisit: false,
        },
    ],
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

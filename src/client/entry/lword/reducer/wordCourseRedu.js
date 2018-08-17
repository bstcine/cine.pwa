import { fromJS, Map } from 'immutable';
import * as actionType from '@/constant/actionTypeLWord';

const getCourseItems = (startID, range, lastVisitIndex, userQuizRows) => {
    const wordStartID = parseInt(startID, 10);
    const wordCount = parseInt(range, 10);
    const lastVisitID = 1 + parseInt((lastVisitIndex - wordStartID) / 50, 10);

    let items = [];
    for (let i = 0; i < wordCount / 50; i++) {
        const id = i + 1;
        const isLastVisit = id === lastVisitID;
        const value = wordStartID + i * 50 + '-' + (wordStartID + i * 50 + 49);

        let wQuizScore = -1;
        if (userQuizRows) {
            userQuizRows.forEach(quizItem => {
                const valueID = wordStartID + i * 50;
                if (quizItem.id === valueID) {
                    wQuizScore = quizItem.quiz_score;
                }
            });
        }

        const item = {
            id,
            value,
            wQuizScore,
            wKnownCount: 0,
            isLastVisit,
        };
        items.push(item);
    }

    return items;
};

const initWordCourse = Map({
    userID: null,
    wordStartID: 1,
    lastVisitID: 502,
    lessons: getCourseItems(1, 3000, 3552),
});

const WordCourseRedu = (state = initWordCourse, action) => {  
    switch (action.type) {
        case actionType.WC_Init_Course: {
            const payload = action.payload;
            const lessons = getCourseItems(
                payload.wordStartID,
                payload.wordCount,
                payload.lastVisitID
            );

            return state
                .set('lessons', lessons)
                .set('lastVisitID', payload.lastVisitID);
        }
        case actionType.WC_Request_User_Word_Learn_Detail: {
            const payload = action.payload;
            const lessons = getCourseItems(
                payload.wordStartID,
                payload.wordCount,
                payload.lastVisitID,
                payload.result
            );

            return state
                .set('lessons', lessons)
                .set('lastVisitID', payload.lastVisitID);
        }

        default:
            return state;
    }
};

export default WordCourseRedu;

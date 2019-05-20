import { fromJS, Map } from 'immutable';
import * as actionType from '@/constant/actionTypeLWord';

const getCourseItems = (
    startID,
    range,
    lastVisitID,
    userQuizRows,
    dictCategoryList
) => {
    if (dictCategoryList) {
        const items = dictCategoryList.map(cate => {
            const item = {
                id: cate.id,
                value: cate.name,
                wKnownCount: 0,
                isLastVisit: cate.id === lastVisitID,
                wQuizScore: -1,
            };
            if (userQuizRows) {
                userQuizRows.forEach(quizItem => {
                    if (quizItem.object_id === cate.id) {
                        item.wQuizScore = quizItem.score;
                    }
                });
            }
            return item;
        });
        return items;
    } else {
        const wordStartID = 1 + parseInt(parseInt(startID, 10) / 50, 10);
        const wordCount = parseInt(range, 10);
        lastVisitID = 1 + parseInt((lastVisitID - wordStartID) / 50, 10);

        let items = [];
        for (let i = 0; i < wordCount / 50; i++) {
            const id = i + 1;
            const isLastVisit = id === lastVisitID;
            const value =
                wordStartID + i * 50 + '-' + (wordStartID + i * 50 + 49);

            let wQuizScore = -1;
            if (userQuizRows) {
                userQuizRows.forEach(quizItem => {
                    const valueID = wordStartID + i * 50;
                    if (quizItem.id === valueID) {
                        wQuizScore = quizItem.score;
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
    }
};

const initWordCourse = Map({
    userID: null,
    wordStartID: 1,
    lastVisitID: -2001,
    lessons: [],
    mode: 'top1w',
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
                payload.wordQuizResult,
                payload.dictCategoryList
            );
            console.log('lessons', lessons);
            if (payload.dictCategoryList && payload.dictCategoryList.length) {
                return state
                    .set('name', payload.name)
                    .set('mode', 'dict')
                    .set('lessons', lessons)
                    .set('lastVisitID', payload.lastVisitID);
            } else {
                return state
                    .set('name', payload.name)
                    .set('lessons', lessons)
                    .set('lastVisitID', payload.lastVisitID);
            }
        }

        default:
            return state;
    }
};

export default WordCourseRedu;

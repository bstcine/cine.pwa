import React from 'react';
import WordLessonG from './WordLessonGroup';

const WordLessonList = ({ lessons, layout, lastVisitID, groupCount }) => {
    let ls1 = [];
    let ls2 = [];
    let ls3 = [];
    let ls4 = [];
    let ls5 = [];

    const lessonGroupCount = lessons.length / 5;
    const exL = 1 + parseInt(lastVisitID / lessonGroupCount, 10);
    for (let i = 0; i < lessonGroupCount; i++) {
        const item1 = lessons[i];
        ls1.push(item1);
    }
    for (let i = lessonGroupCount; i < lessonGroupCount * 2; i++) {
        const item2 = lessons[i];
        ls2.push(item2);
    }
    for (let i = lessonGroupCount * 2; i < lessonGroupCount * 3; i++) {
        const item3 = lessons[i];
        ls3.push(item3);
    }
    for (let i = lessonGroupCount * 3; i < lessonGroupCount * 4; i++) {
        const item4 = lessons[i];
        ls4.push(item4);
    }
    for (let i = lessonGroupCount * 4; i < lessonGroupCount * 5; i++) {
        const item5 = lessons[i];
        ls5.push(item5);
    }

    return (
        <React.Fragment>
            <WordLessonG
                lessons={ls1}
                layout={layout}
                title="善恩核心10000词汇: 1 - 2000"
                expanded={exL === 1}
            />
            <WordLessonG
                lessons={ls2}
                layout={layout}
                title="善恩核心10000词汇: 2001 - 4000"
                expanded={exL === 2}
            />
            <WordLessonG
                lessons={ls3}
                layout={layout}
                title="善恩核心10000词汇: 4001 - 6000"
                expanded={exL === 3}
            />
            <WordLessonG
                lessons={ls4}
                layout={layout}
                title="善恩核心10000词汇: 6001 - 8000"
                expanded={exL === 4}
            />
            <WordLessonG
                lessons={ls5}
                layout={layout}
                title="善恩核心10000词汇: 8001 - 10000"
                expanded={exL === 5}
            />
        </React.Fragment>
    );
};

export default WordLessonList;

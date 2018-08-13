import React from 'react';
import { CCardContainer, CCard } from '@/component/_base';

const WordLessonItem = ({ value, actions }) => {
    return (
        <React.Fragment>
            <div className="wordLesson">
                <a href="/experiences" target="_blank">
                    <div className="img-c" />
                </a>

                <div className="text-c">{value.id}</div>
            </div>
        </React.Fragment>
    );
};

const WordLessonList = ({ lessons, layout, actions }) => {
    let lessonList = lessons.map((wordLesson, i) => {
        return (
            <CCard key={i} hover = "shadow">
                <WordLessonItem value={wordLesson} />
            </CCard>
        );
    });

    return (
        <CCardContainer layout={layout} gap="large">
            {lessonList}
        </CCardContainer>
    );
};
export default WordLessonList;

import React from 'react';
import { CCardContainer, CCard } from '@/component/_base';

const WordLessonItem = ({ item, actions }) => {
    const className = item.isLastVisit ? 'lesson lastVisit' : 'lesson';
    return (
        <React.Fragment>
            <div className={className}>
                <a href="/experiences" target="_blank">
                    <div className="img-c" />
                </a>

                <div className="text-c">{item.id}</div>
                <div className="text-c">{item.value}</div>
                <div className="text-c">-</div>
            </div>
        </React.Fragment>
    );
};

const WordLessonList = ({ lessons, layout, actions }) => {
    let lessonList = lessons.map((wordLesson, i) => {
        return (
            <CCard key={i} hover="shadow">
                <WordLessonItem item={wordLesson} />
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

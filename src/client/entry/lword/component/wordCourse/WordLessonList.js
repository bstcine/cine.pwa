import React from 'react';
import { CCardContainer, CCard } from '@/component/_base';

const WordLessonItem = ({ item, actions }) => {
    const className = item.isLastVisit ? 'lesson lastVisit' : 'lesson';
    return (
        <React.Fragment>
            <div className={className}>
                <a href="/experiences" target="_blank">
                    <div className="top">
                        <div className="no">第{item.id}组</div>
                        <div className="fromto">{item.value}</div>
                    </div>
                </a>

                <div className="middle" />
                <div className="bottom">
                    <div className="quizScore">{item.wQuizScore}</div>
                    <div className="quiz">测试成绩</div>
                </div>
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

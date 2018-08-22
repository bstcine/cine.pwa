import React from 'react';
import { CCardContainer, CCard } from '@/component/_base';
import WordLessonItem from './WordLessonItem';

const WordLessonList = ({ lessons, layout, actions }) => {
    let lessonList = lessons.map((wordLesson, i) => {
        return (
            <CCard key={i} hover="lighten">
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

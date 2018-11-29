import React from 'react';
import { CardCourse } from './CardCourseItem';
import { CardTeacher } from './CardTeacherItem';
import { CardArticle } from './CardArticleItem';
import { CardItem } from './CardItem';
import './style.less';

export const CourseList = ({ list, hover }) => {
    let cardList = list.map((item, i) => {
        return <CardCourse key={i} value={item} hover={hover} />;
    });
    return cardList;
};
export const TeacherList = ({ list, hover, isMentor, limit }) => {
    let cardList = list.map((item, i) => {
        if (limit && i >= limit) return '';

        return <CardTeacher key={i} value={item} isMentor={isMentor} />;
    });
    return cardList;
};
export const ArticleList = ({ list, hover }) => {
    let cardList = list.map((item, i) => {
        return <CardArticle key={i} value={item} hover={hover} />;
    });
    return cardList;
};
export const CardList = ({ list, hover, limit, actions }) => {
    let cardList = list.map((item, i) => {
        if (limit && i >= limit) return '';

        return (
            <CardItem key={i} value={item} hover={hover} actions={actions} />
        );
    });
    return cardList;
};

export { CardItem, CardCourse, CardTeacher };

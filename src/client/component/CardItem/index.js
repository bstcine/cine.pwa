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
export const TeacherList = ({ list, hover, actions }) => {
    let cardList = list.map((item, i) => {
        return <CardTeacher key={i} value={item} actions={actions} />;
    });
    return cardList;
};
export const ArticleList = ({ list, hover }) => {
    let cardList = list.map((item, i) => {
        return <CardArticle key={i} value={item} hover={hover} />;
    });
    return cardList;
};

export { CardItem, CardCourse, CardTeacher };

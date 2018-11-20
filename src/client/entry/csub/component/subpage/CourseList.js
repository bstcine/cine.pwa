import React from 'react';
import { CCardContainer } from '@/component/_base';
import { CourseList } from '@/component/CardItem';

const CourseExList = ({ isCourse, courses, actions }) => {
    const layout = isCourse ? '234' : '112';
    let exList = <CourseList list={courses} hover="lighten" />;

    return <CCardContainer layout={layout}>{exList}</CCardContainer>;
};
export default CourseExList;

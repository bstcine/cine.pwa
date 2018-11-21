import React from 'react';
import { CPanel, CCardContainer } from '@/component/_base';
import { CourseList } from '@/component/CardItem';

const CourseExList = ({ isCourse, courses, actions }) => {
    const layout = isCourse ? '234' : '112';
    let exList = <CourseList list={courses} hover="lighten" />;

    return <CCardContainer layout={layout}>{exList}</CCardContainer>;
};
// export default CourseExList;

export default class PCourse extends React.PureComponent {
    render() {
        const { isCourse, list } = this.props;
        const layout = isCourse ? '234' : '112';
        let exList = <CourseList list={list} hover="lighten" />;

        return (
            <CPanel title="私塾导师" className="bg-blue">
                <CCardContainer layout={layout}>{exList}</CCardContainer>
            </CPanel>
        );
    }
}

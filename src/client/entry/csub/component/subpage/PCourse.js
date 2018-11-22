import React from 'react';
import { CPanel, CCardContainer } from '@/component/_base';
import { CourseList } from '@/component/CardItem';

export default class PCourse extends React.PureComponent {
    render() {
        const { isCourse, list } = this.props;
        const layout = isCourse ? '234' : '122';
        let exList = <CourseList list={list} hover="lighten" />;

        return (
            <CPanel title="核心课程">
                <CCardContainer layout={layout}>{exList}</CCardContainer>
            </CPanel>
        );
    }
}

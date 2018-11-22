import React from 'react';
import { CPanel, CCardContainer } from '@/component/_base';
import { TeacherList } from '@/component/CardItem';

export default class PTeacher extends React.PureComponent {
    render() {
        const { isMentor, list } = this.props;
        const title = isMentor ? "私塾导师" : "录课老师";
        return (
            <CPanel title={title} className="bg-blue">
                <CCardContainer layout={isMentor ? "245" : "234"}>
                    <TeacherList list={list} isMentor={isMentor} />
                </CCardContainer>
            </CPanel>
        );
    }
}

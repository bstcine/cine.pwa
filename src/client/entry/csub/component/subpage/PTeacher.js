import React from 'react';
import { CPanel, CCardContainer } from '@/component/_base';
import { TeacherList } from '@/component/CardItem';

export default class PTeacher extends React.PureComponent {
    render() {
        const { isMentor, list } = this.props;

        return (
            <CPanel title="私塾导师" className="bg-blue">
                <CCardContainer layout="245">
                    <TeacherList list={list} isMentor={isMentor} />
                </CCardContainer>
            </CPanel>
        );
    }
}

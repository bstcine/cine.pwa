import React from 'react';
import { CPanel, CCardContainer } from '@/component/_base';
import { TeacherList } from '@/component/CardItem';
import Clink from './Clink';

export default class PTeacher extends React.PureComponent {
    render() {
        const { isMentor, list } = this.props;
        const title = isMentor ? '私塾导师' : '录课老师';
        const href = isMentor ? '/tutor' : '/teacher';
        const limit = isMentor ? 10 : 12;
        const link = <Clink text="更多" href={href} target="_blank" />;

        return (
            <CPanel title={title} className="bg-blue" ext={link}>
                <CCardContainer layout={isMentor ? '245' : '234'}>
                    <TeacherList
                        list={list}
                        isMentor={isMentor}
                        limit={limit}
                    />
                </CCardContainer>
            </CPanel>
        );
    }
}

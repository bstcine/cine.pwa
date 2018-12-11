import React from 'react';
import { CPanel, CCardContainer } from '@/component/_base';
import { CourseList, TeacherList } from '@/component/CardItem';
import { SideBarSubPage } from '@/component/SideBar/SubPage';

export default class SubPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sbValue: 'course',
        };

        this.onChangeFromSB = this.onChangeFromSB.bind(this);
    }

    onChangeFromSB(sb_value) {
        switch (sb_value) {
            case 'course':
                alert('WechatShare');
                break;
            case 'teacher':
                alert('与Android交互');
                break;
            case 'comment':
                alert('与iOS交互');
                break;
            case 'article':
                alert(sb_value);
                break;
            case 'resource':
                alert('Show CWindow');
                break;
        }
    }

    render() {
        const { isMentor, courses, teachers } = this.props;
        const courseList = courses ? courses.toJS() : [];
        const teacherList = teachers.toJS();

        return (
            <React.Fragment>
                <SideBarSubPage
                    layout={this.props.layout}
                    isMentor={isMentor}
                    value={this.state.sbValue}
                    onChange={this.onChangeFromSB}
                />

                <CPanel title="核心课程">
                    <CCardContainer layout="234">
                        <CourseList list={courseList} hover="lighten" />
                    </CCardContainer>
                </CPanel>

                <CPanel title="私塾导师" className="bg-blue">
                    <CCardContainer layout="245">
                        <TeacherList
                            list={teacherList}
                            isMentor={isMentor}
                            limit={10}
                        />
                    </CCardContainer>
                </CPanel>
            </React.Fragment>
        );
    }
}

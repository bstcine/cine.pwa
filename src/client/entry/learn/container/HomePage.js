import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tasks from './Tasks';
import Courses from './Courses';
import '@/entry/learn/asset/style/index.less';
import { withRouter } from 'react-router-dom';
import { GLayoutContainer } from '@/g/container';
import WordCourses from './../component/home/WordCourses';
import { CPanel } from '@/component/_base';
import * as wordCourse from '@/service/data/response_word_course.json';

const mapStateToProps = state => {
    const { userRedu } = state;
    return {
        user: userRedu.data,
        courses: wordCourse.result,
    };
};

class HomePage extends Component {
    render() {
        const { user, courses } = this.props;
        return (
            <GLayoutContainer>
                {!!user && (
                    <CPanel>
                        <a href={'/learn/achieve?user_id=' + user.id}>
                            打卡分享
                        </a>
                    </CPanel>
                )}
                {!!user && user.type === '2' && <Tasks />}
                <WordCourses courses={courses}/>
                <Courses />
            </GLayoutContainer>
        );
    }
}

export default withRouter(connect(mapStateToProps)(HomePage));

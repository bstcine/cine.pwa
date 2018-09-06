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
                {!!user && user.type === '2' && <Tasks user={user} />}
                <WordCourses courses={courses} />
                <Courses />
            </GLayoutContainer>
        );
    }
}

export default withRouter(connect(mapStateToProps)(HomePage));

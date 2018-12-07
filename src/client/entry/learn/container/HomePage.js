import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tasks from './Tasks';
import Courses from './Courses';
import '@/entry/learn/asset/style/index.less';
import { withRouter } from 'react-router-dom';
import { GLayoutContainer } from '@/g/container';
import WordCourses from './../component/home/WordCourses';
import * as wordCourse from '@/service/data/response_word_course.json';
import gAction from '@/g/action';
import siteCodeUtil from "@/util/sitecodeUtil";
import TabBar from "@/component/TabBar";

const mapStateToProps = state => {
    const { userRedu } = state;
    return {
        user: userRedu.data,
        courses: wordCourse.result,
    };
};

class HomePage extends Component {
    componentDidMount() {
        this.props.dispatch(gAction.preFetchUserInfo());
    }

    render() {
        const { user, courses } = this.props;
        return (
            <GLayoutContainer>
                {!!user && user.type === '2' && <Tasks user={user} />}
                <WordCourses courses={courses} />
                <Courses />
                {!siteCodeUtil.inAPP() && <TabBar />}
            </GLayoutContainer>
        );
    }
}

export default withRouter(connect(mapStateToProps)(HomePage));

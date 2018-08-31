import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tasks from './Tasks';
import Courses from './Courses';
import '@/entry/learn/asset/style/index.less';
import { withRouter } from 'react-router-dom';
import { GLayoutContainer } from '@/g/container';
import WordCourses from './../component/home/WordCourses';
import { CPanel } from '@/component/_base';

const mapStateToProps = state => {
    const { userRedu } = state;
    return { user: userRedu.data };
};

class HomePage extends Component {
    render() {
        const { user } = this.props;
        return (
            <GLayoutContainer>
                <CPanel>
                    <a href="/learn/achieve">私塾分享静态DEMO页</a>
                </CPanel>
                {!!user && user.type === '2' && <Tasks />}
                <WordCourses />
                <Courses />
            </GLayoutContainer>
        );
    }
}

export default withRouter(connect(mapStateToProps)(HomePage));

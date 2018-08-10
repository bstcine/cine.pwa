import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tasks from './Tasks';
import Courses from './Courses';
import '@/entry/learn/asset/style/index.less';
import { withRouter } from 'react-router-dom';
import { GLayoutContainer } from '@/g/container';

const mapStateToProps = state => {
    const { userRedu } = state;
    return { user: userRedu.data };
};

class HomePage extends Component {
    render() {
        const { user } = this.props;
        return (
            <GLayoutContainer>
                {!!user && user.type === '2' && <Tasks />}
                <Courses />
            </GLayoutContainer>
        );
    }
}

export default withRouter(connect(mapStateToProps)(HomePage));

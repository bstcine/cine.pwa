// 访问本页 /mentor
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mentorAction from '@/action/mentorAction';
import StuTaskTable from '@/entry/mentor/component/StuTask/StuTaskTable';
import { GLayoutContainer } from '@/g/container';

class StuTaskContainer extends Component {
    componentDidMount() {
        this.props.actions.fetchMentorStudentTask();
    }

    render() {
        let { mentorStudentTask, actions } = this.props;
        return (
            <GLayoutContainer>
                <div className="mentor-container task">
                    <StuTaskTable list={mentorStudentTask} actions={actions} />
                </div>
            </GLayoutContainer>
        );
    }
}

const mapStateToProps = state => ({
    mentorStudentTask: state.mentorStudentTask,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(mentorAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StuTaskContainer);

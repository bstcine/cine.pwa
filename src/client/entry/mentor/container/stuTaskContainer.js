// 访问本页 /mentor
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toast } from '@/component/Toast';
import * as mentorAction from '@/action/mentorAction';
import { FETCH_MENTOR_STUDENT_TASK } from '@/constant/actionTypeMentor';
import StuTaskTable from '@/entry/mentor/component/StuTask/StuTaskTable';

class StuTaskContainer extends Component {
    componentDidMount() {
        this.props.actions.fetchMentorStudentTask();
    }

    render() {
        let { networkFetchStatus, mentorStudentTask } = this.props;
        let network = networkFetchStatus[FETCH_MENTOR_STUDENT_TASK] || {};

        return (
            <div className="mentor-container task">
                <Toast network={network} />
                <StuTaskTable list={mentorStudentTask} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        networkFetchStatus: state.networkFetchStatus,
        mentorStudentTask: state.mentorStudentTask,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(mentorAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StuTaskContainer);

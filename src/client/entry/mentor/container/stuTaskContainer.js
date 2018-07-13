// 访问本页 /mentor
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toast } from '@/component/Toast';
import * as mentorAction from '@/action/mentorAction';
import StuTaskTable from '@/entry/mentor/component/StuTask/StuTaskTable';
import Confirm from '@/component/Confirm';

class StuTaskContainer extends Component {
    componentDidMount() {
        this.props.actions.fetchMentorStudentTask();
    }

    render() {
        let { mentorStudentTask, networkModal, actions } = this.props;
        let network = networkModal || {};

        return (
            <div className="mentor-container task">
                <Toast network={network} />
                <Confirm />
                <StuTaskTable list={mentorStudentTask} actions={actions} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    networkModal: state.networkModal,
    mentorStudentTask: state.mentorStudentTask,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(mentorAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StuTaskContainer);

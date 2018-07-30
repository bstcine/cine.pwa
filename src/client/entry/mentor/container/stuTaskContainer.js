// 访问本页 /mentor
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Toast } from '@/component/Toast';
import * as mentorAction from '@/action/mentorAction';
import StuTaskTable from '@/entry/mentor/component/StuTask/StuTaskTable';
// import Confirm from '@/component/Confirm';

class StuTaskContainer extends Component {
    componentDidMount() {
        this.props.actions.fetchMentorStudentTask();
    }

    render() {
        let { mentorStudentTask, actions } = this.props;
        return (
            <div className="mentor-container task">
                {/* <Toast network={toastRedu} /> */}
                {/* <Confirm /> */}
                <StuTaskTable list={mentorStudentTask} actions={actions} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    // toastRedu: state.toastRedu,
    mentorStudentTask: state.mentorStudentTask,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(mentorAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StuTaskContainer);

// 访问本页 /mentor
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { mentorAction } from '@/action/mentorAction';

class StuTaskContainer extends Component {
    componentDidMount() {
        // 获取参
    }

    render() {
        // let { state, actions } = this.props;

        return <div>学生作业列表</div>;
    }
}

const mapStateToProps = state => {
    return {
        state: state,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(mentorAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StuTaskContainer);

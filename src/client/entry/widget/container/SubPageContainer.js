import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import subPageAction from '@/action/subPageAction';
import SubPage from '@/entry/widget/component/subPage';
import { interEventEmitter } from '@/util/_base/interEventEmitter';
import { CMessage } from '@/component/_base';
import RootContainer from "./_rootContainter";

class SubPageContainer extends Component {
    componentDidMount() {
        interEventEmitter.on('android_call_h5_test', data => {
            CMessage.info(JSON.stringify(data));
        });
    }

    render() {
        let { courses, teachers, articles, comments, resources } = this.props;
        return (
            <RootContainer>
                <SubPage
                    isCourse={true}
                    isMentor={true}
                    courses={courses}
                    teachers={teachers}
                    comments={comments}
                    articles={articles}
                    resources={resources}
                    layout="sec"
                />
            </RootContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        courses: state.subPageRedu.get('course'),
        teachers: state.subPageRedu.get('teacher'),
        articles: state.subPageRedu.get('article'),
        comments: state.subPageRedu.get('comment'),
        resources: state.subPageRedu.get('resource'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(subPageAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubPageContainer);

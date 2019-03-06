import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import subPageAction from '@/action/subPageAction';
import SubPage from '@/entry/widget/component/subPage';
import { interEventEmitter } from '@/util/_base/interEventEmitter';
import { CMessage } from '@/component/_base';
import { GLayoutContainer } from '@/g/container';

class SP_FJYDContainer extends Component {
    componentDidMount() {
        interEventEmitter.on('android_call_h5_test', data => {
            CMessage.info(JSON.stringify(data));
        });
    }

    render() {
        let { courses, teachers, articles, comments, resources } = this.props;
        return (
            <GLayoutContainer>
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
            </GLayoutContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        courses: state.spageRedu.get('course'),
        teachers: state.spageRedu.get('teacher'),
        articles: state.spageRedu.get('article'),
        comments: state.spageRedu.get('comment'),
        resources: state.spageRedu.get('resource'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(subPageAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SP_FJYDContainer);

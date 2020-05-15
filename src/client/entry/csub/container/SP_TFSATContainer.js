import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import subPageAction from '@/action/subPageAction';
import SubPage from './../component/subpage';
import CSubRoot from '@/entry/csub/container/Root';

class SP_TFSATContainer extends Component {
    componentDidMount() {
        this.props.actions.initData('tfsat');
    }

    render() {
        let { courses, teachers, articles, comments, resources } = this.props;
        return (
            <CSubRoot>
                <SubPage
                    isCourse={true}
                    isMentor={false}
                    courses={courses}
                    teachers={teachers}
                    comments={comments}
                    articles={articles}
                    resources={resources}
                />
            </CSubRoot>
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

export default connect(mapStateToProps, mapDispatchToProps)(SP_TFSATContainer);

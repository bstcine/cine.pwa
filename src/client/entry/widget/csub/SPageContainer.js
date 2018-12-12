import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import subPageAction from '@/action/subPageAction';
import SubPage from '@/entry/widget/csub/component';

class SP_FJYDContainer extends Component {
    componentDidMount() {
        // this.props.actions.initData("fjyd");
    }

    render() {
        let { courses, teachers, articles, comments, resources } = this.props;
        return (
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

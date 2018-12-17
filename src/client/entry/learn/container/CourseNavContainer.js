import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CourseNav from '../component/course/CourseNav';
import * as learnAction from '@/action/learnAction';
import { getParam } from '@/util/_base/urlUtil';

const mapStateToProps = state => {
    const { lessonTree } = state;
    return { lessonTree };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(learnAction, dispatch),
});

class CourseNavContainer extends Component {
    componentDidMount() {
        const { match } = this.props;
        this.props.actions.fetchLessonTree({ course_id: match.params.cid });
    }

    render() {
        console.log('CourseNavContainer render');

        const { lessonTree, actions } = this.props;
        const lesson_id = getParam().lesson_id;
        return (
            <CourseNav
                activeId={lesson_id}
                tree={lessonTree}
                actions={actions}
            />
        );
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CourseNavContainer)
);

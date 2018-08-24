import React, { PureComponent, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CourseContent from '../component/course/CourseContent';
import * as learnAction from '@/action/learnAction';
import { getParam } from '@/util/urlUtil';

const mapStateToProps = state => {
    const { lessonDetail } = state;
    return { lessonDetail };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(learnAction, dispatch),
});

class CourseContentContainer extends Component {
    componentDidMount() {
        const lessonId = getParam().lesson_id;
        this.props.actions.fetchLessonDetail({ lessonId });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.search !== this.props.location.search) {
            const lessonId = getParam().lesson_id;
            console.log('fetch new lesson', lessonId);
            this.props.actions.fetchLessonDetail({ lessonId });
        }
    }

    render() {
        const { lessonDetail } = this.props;
        return <CourseContent lessonDetail={lessonDetail} />;
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CourseContentContainer)
);

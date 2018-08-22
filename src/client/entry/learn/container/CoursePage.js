import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { GLayoutContainer } from '@/g/container';
import CourseNav from '../component/CourseNav';
import CourseContent from '../component/CourseContent';
import '../asset/style/coursePage.less';
import * as learnAction from '@/action/learnAction';
import { getParam } from '@/util/urlUtil';

const mapStateToProps = state => {
    const { lessonTree } = state;
    return { lessonTree };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(learnAction, dispatch),
});

class CoursePage extends Component {
    componentDidMount() {
        const { match } = this.props;
        this.props.actions.fetchLessonTree({ course_id: match.params.cid });
    }

    render() {
        const { match, lessonTree } = this.props;
        console.log(match);
        const lesson_id = getParam().lesson_id;
        console.log('active_id', lesson_id);

        return (
            <GLayoutContainer size="large">
                <div className="course__main">
                    <CourseContent />
                    <CourseNav active_id={lesson_id} tree={lessonTree} />
                </div>
            </GLayoutContainer>
        );
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CoursePage)
);

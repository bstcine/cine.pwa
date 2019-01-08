import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { wCourseAction } from '@/action/wCourseAction';
import { getParam } from '@/util/_base/urlUtil';
import WordCourse from './../component/wordCourse';
import { GLayoutContainer } from "@/g/container";

class WordCourseContainer extends Component {
    constructor(props) {
        super(props);
        document.title = '核心词汇';
        this.param = getParam();
        this.props.actions.initCourseLessons(this.param);
    }

    componentDidMount() {
        this.props.actions.loadUserWordLearnAndQuiz(this.param);
    }

    render() {
        let { lessons, lastVisitID, actions } = this.props;
        const course_id = this.param.start_index
            ? `${this.param.start_index}-${this.param.range}`
            : '1-10000';
        console.log('1111');
        return (
            <GLayoutContainer>
                <WordCourse
                    lessons={lessons}
                    lastVisitID={lastVisitID}
                    courseID={course_id}
                    actions={actions}
                />
            </GLayoutContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        lessons: state.WordCourseRedu.get('lessons'),
        lastVisitID: state.WordCourseRedu.get('lastVisitID'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(wCourseAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    WordCourseContainer
);

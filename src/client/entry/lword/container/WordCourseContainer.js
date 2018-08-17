import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { wCourseAction } from '@/action/wCourseAction';
import { getParam } from '@/util/urlUtil';
import WordCourse from './../component/wordCourse';

class WordCourseContainer extends Component {
    constructor(props) {
        super(props);

        this.param = getParam();
        this.props.actions.initCourseLessons(this.param);
    }

    componentDidMount() {
        this.props.actions.loadUserWordLearnAndQuiz(this.param);
    }

    render() {
        let { lessons, lastVisitID, actions } = this.props;
        return (
            <React.Fragment>
                <WordCourse
                    lessons={lessons}
                    lastVisitID={lastVisitID}
                    actions={actions}
                />
            </React.Fragment>
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

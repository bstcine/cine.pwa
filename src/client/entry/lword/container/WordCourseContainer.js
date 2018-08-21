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
        let { start_index, range } = this.param;
        start_index = parseInt(start_index, 10);
        range = parseInt(range, 10);
        let estimate = `${start_index}-${start_index - 1 + range}`;
        this.estimate = estimate;
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
                    estimate={this.estimate}
                    items={lessons}
                    lastVisitID={lastVisitID}
                    actions={actions}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    // alert(state.WordCourseRedu.get('wordStartID'));
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

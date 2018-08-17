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
        const ele = document.querySelector(`l${this.props.lastVisitID}`);
        if (ele) {
            const rectY = ele.getBoundingClientRect().top;
            scrollTo(0, rectY);
            alert(rectY);
        }
    }

    render() {
        let { lessons, lastVisitID, actions } = this.props;
        return (
            <React.Fragment>
                <WordCourse
                    items={lessons}
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

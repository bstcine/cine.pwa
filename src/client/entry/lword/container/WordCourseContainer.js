import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import gAction from '@/g/action';
import WordCourse from './../component/wordCourse';

class WordCourseContainer extends Component {
    componentDidMount() {
        // this.props.actions.loadUserCoupon();
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
        courseID: state.WordCourseRedu.get('courseID'),
        lessons: state.WordCourseRedu.get('lessons'),
        lastVisitID: state.WordCourseRedu.get('lastVisitID'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(gAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    WordCourseContainer
);

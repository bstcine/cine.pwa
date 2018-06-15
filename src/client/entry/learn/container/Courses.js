import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Courses from '../component/Courses';
import { fetchMyCourseList } from '@/action/learnAction';

const mapStateToProps = state => {
    const { courses } = state;
    return { courses };
};

const mapDispatchToProps = dispatch => ({
    fetchMyCourseList: () => {
        dispatch(fetchMyCourseList());
    },
});
class CoursesContainer extends PureComponent {
    componentDidMount() {
        this.props.fetchMyCourseList();
    }
    render() {
        const { courses } = this.props;
        return <Courses courses={courses} />;
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursesContainer);

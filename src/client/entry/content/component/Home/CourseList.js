import React, {Component} from 'react';
import Course from './Course';

export default class CourseList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {courses, ...props} = this.props;
        return (
            <div className="course-list">
                {courses.map((course, i) => <Course key={i} course={course} {...props} />)}
            </div>
        );
    }
}

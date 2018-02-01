import React, {Component} from 'react';
import CourseList from './CourseList';

export default class Category extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {category, ...props} = this.props;
        return (
            <div className="category">
                <div className="category-text">
                    <div id={`cat${category.id}`} className="category-anchor" />
                    <span>•</span> {category.name}
                    <span className="category-intro">{category.remark}</span>
                </div>
                <CourseList courses={category.children} {...props} />
            </div>
        );
    }
}

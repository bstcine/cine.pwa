import React, { Component } from 'react';
import CourseList from './CourseList';

export default class Category extends Component {
    render() {
        let { category, ...props } = this.props;
        if(!category.courses.length) return null;
        return (
            <div className="category">
                <div className="category-text">
                    <div id={`cat${category.id}`} className="category-anchor" />
                    <span className="text-blue">•</span> {category.name}
                    <span className="category-intro">{category.remark}</span>
                </div>
                <CourseList courses={category.courses} {...props} />
            </div>
        );
    }
}

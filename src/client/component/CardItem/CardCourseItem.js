import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import { CCard } from '@/component/_base';
import CommonUtil from '@/util/common';
import './styleCourse.less';

export default class CardCourse extends Component {
    displayPrice(course) {
        if (course.status & (course.status === '2')) {
            return <div className="course-title joy-soon">待推出</div>;
        } else {
            /*   if (isNaN(course.price)) {
                return <div className="course-price">{course.price}</div>;
            } else { */
            if (course.original_price) {
                return (
                    <div className="course-price">
                        {CommonUtil.getCurrencySymbol(course.currency)}
                        {course.price}
                        <span className="old-price-text">原价</span>
                        <span className="old-price">
                            {CommonUtil.getCurrencySymbol(course.currency)}
                            {course.original_price}
                        </span>
                    </div>
                );
            } else {
                return (
                    <div className="course-price">
                        {CommonUtil.getCurrencySymbol(course.currency)}
                        {course.price}
                    </div>
                );
            }
            /*  } */
        }
    }

    renderAuthor(course) {
        return (
            <div className="course-author">
                {course.author ? `授课老师：${course.author}` : ''}
            </div>
        );
    }

    renderTimeArrange(course) {
        return (
            <div className="course-arrange">
                {course.time_arrange ? `学习课时：${course.time_arrange}` : ''}
            </div>
        );
    }

    render() {
        const { course, hover, layout, actions } = this.props;
        // alert(JSON.stringify(course))
        const url = `//www.bstcine.com/f/${course.img}`;
        const href = `/content/course?cid=${course.id}`;
        return (
            <CCard href={href} hover={hover}>
                <div className="cardCourse">
                    <LazyLoad offset={100} height={200}>
                        <div
                            className="course-img"
                            style={{
                                background: `url(${url}) center center / cover no-repeat`,
                            }}
                        />
                    </LazyLoad>

                    <div className="course-desc">
                        <div className="text-title">{course.name}</div>
                        {this.renderAuthor(course)}
                        {this.renderTimeArrange(course)}
                        {this.displayPrice(course)}
                    </div>
                </div>
            </CCard>
        );
    }
}

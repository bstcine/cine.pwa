import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import CommonUtil from '@/util/common';
import './styleCourse.less';

/* export const CardCourse = ({ value, style, actions }) => {
    const imgBG = `url(${value.cover}) center center / cover no-repeat`;
    const href = value.link ? value.link : '/content/course?cid=';
    return (
        <React.Fragment>
            <div className="cardTeacher">
                <div className="img-c">
                    <a href={href} target="_blank">
                        <div
                            className="img"
                            style={{ background: { imgBG } }}
                        />
                    </a>
                </div>

                <div className="text-c">
                    <div className="title">{value.price}</div>
                    <div className="desc">{value.title}</div>
                </div>
            </div>
        </React.Fragment>
    );
}; */

export default class CardCourse extends Component {
    displayPrice(course) {
        if (course.status & course.status === '2') {
            return <div className="coming-soon">待推出</div>;
        } else {
            if (isNaN(course.price)) {
                return <div className="course-price">{course.price}</div>;
            } else {
                if (course.original_price) {
                    return (
                        <div className="course-price">
                            {/*  {CommonUtil.getCurrencySymbol(course.currency)} */}
                            {course.price}
                            <span className="old-price-text">原价</span>
                            <span className="old-price">
                                {/*   {CommonUtil.getCurrencySymbol(course.currency)} */}
                                {course.original_price}
                            </span>
                        </div>
                    );
                } else {
                    return (
                        <div className="course-price">
                            {/*  {CommonUtil.getCurrencySymbol(course.currency)} */}
                            {course.price}
                        </div>
                    );
                }
            }
        }
    }

    renderAuthor(course) {
        return (
            <div className="course-author">
                {course.sub_title ? `授课老师：${course.sub_title}` : ''}
            </div>
        );
    }

    renderTimeArrange(course) {
        return (
            <div className="course-arrange">
                {course.favorite ? `学习课时：${course.favorite}` : ''}
            </div>
        );
    }

    render() {
        const { course, style, actions } = this.props;

        return (
            <div className="cardCourse">
                <LazyLoad offset={100} height={200}>
                    <div
                        className="course-img"
                        style={{
                            background: `url(${
                                course.cover
                            }) center center / cover no-repeat`,
                        }}
                    />
                </LazyLoad>

                <div className="course-desc">
                    <div className="course-title">{course.title}</div>
                    {this.renderAuthor(course)}
                    {this.renderTimeArrange(course)}
                    {this.displayPrice(course)}
                </div>
            </div>
        );
    }
}

import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import { CCard } from '@/component/_base';
import CommonUtil from '@/util/common';
import './styleCourse.less';

const getImageHref = imgUrl => {
    if (imgUrl.indexOf('static.bstcine.com') !== -1) {
        return imgUrl;
    } else if (imgUrl.startsWith('http')) {
        return imgUrl;
    } else {
        return `//www.bstcine.com/f/${imgUrl}`;
    }
};
const getImageBackground = imgUrl => {
    return `url(${getImageHref(imgUrl)}) center center / cover no-repeat`;
};

export class CardCourse extends Component {
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
        const { value, hover } = this.props;
        // alert(JSON.stringify(course))
        const href = `/content/course?cid=${value.id}`;
        const bg_img = getImageBackground(value.img);

        if (typeof value.img === 'undefined' || !value.img) return <div />;

        return (
            <CCard href={href} hover={hover}>
                <div className="cardCourse">
                    <LazyLoad offset={100} height={200}>
                        <div className="img-169">
                            <div
                                className="img"
                                style={{ background: `${bg_img}` }}
                            />
                        </div>
                    </LazyLoad>

                    <div className="course-desc">
                        <div className="text-title">{value.name}</div>
                        {this.renderAuthor(value)}
                        {this.renderTimeArrange(value)}
                        {this.displayPrice(value)}
                    </div>
                </div>
            </CCard>
        );
    }
}

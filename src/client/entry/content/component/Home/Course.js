import React, {Component} from 'react';
import CourseLink from '@/component/CourseLink';

export default class Course extends Component {
    constructor(props) {
        super(props);
    }

    displayPrice(course) {
        if (course.status === '1') {
            if (isNaN(course.price)) {
                return <div className="course-price">{course.price}</div>;
            } else {
                if (course.original_price) {
                    return (
                        <div className="course-price">
                            ￥{course.price}
                            <span className="old-price-text">原价</span>
                            <span className="old-price">￥{course.original_price}</span>
                        </div>
                    );
                } else {
                    return <div className="course-price">￥{course.price}</div>;
                }
            }
        } else if (course.status === '2') {
            return <div className="coming-soon">待推出</div>;
        }
    }

    renderAuthor(course){
        if(course.object_type === '1'){
            return (
                <div className="course-author">
                    {course.author ? `授课老师：${course.author}` : ""}
                </div>
            )
        }else{
            if(course.author){
                return (
                    <div className="course-author">
                        {`授课老师：${course.author}`}
                    </div>
                )
            }else{
                return null
            }
        }
    }

    renderTimeArrange(course) {
        if(course.object_type === '1'){
            return (
                <div className="course-arrange">
                    {course.time_arrange ? `学习课时：${course.time_arrange}` : ""}
                </div>
            )
        }else{
            if(course.time_arrange){
                return (
                    <div className="course-arrange">
                        {`学习课时：${course.time_arrange}`}
                    </div>
                )
            }else{
                return null
            }
        }
    }

    render() {
        const {course, ...props} = this.props;

        return (
            <div className="course-wrap">
                <CourseLink course={course} className="course-item" {...props}>

                    <div
                        className="course-img"
                        style={{
                            background: `url(http://www.bstcine.com/f/${
                                course.img
                                }) center center / cover no-repeat`
                        }}
                    />

                    <div className="course-desc">
                        <div className="course-title">{course.name}</div>
                        {this.renderAuthor(course)}
                        {this.renderTimeArrange(course)}
                        {this.displayPrice(course)}
                    </div>

                </CourseLink>
            </div>
        );
    }
}

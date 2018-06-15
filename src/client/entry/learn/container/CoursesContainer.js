import React, { Component } from 'react';

import classNames from 'classnames';
import { Row, Column122 } from '@/component/GGrid';

const TextFix = ({ children }) => (
    <span className={classNames({ textfix: children.indexOf('《') === 0 })}>
        {children}
    </span>
);

class CoursesContainer extends Component {
    render() {
        const courses = [
            {
                id: '42',
                name: '中午农庄',
                img: 'http://www.bstcine.com/f/2018/05/31/155700603SE2Vwgk.jpg',
                last_content_name: 'Lesson 1',
                progress: 100,
            },
            {
                id: '41',
                name: '中午农庄1',
                img: 'http://www.bstcine.com/f/2018/05/31/155700603SE2Vwgk.jpg',
                last_content_name: 'Lesson 3',
                progress: 20,
            },
            {
                id: '4',
                name: '中午农2庄',
                img: 'http://www.bstcine.com/f/2018/05/31/155700603SE2Vwgk.jpg',
                last_content_name: 'Lesson 4',
                progress: 30,
            },
            {
                id: '45',
                name: '中午农33庄',
                img: 'http://www.bstcine.com/f/2018/05/31/155700603SE2Vwgk.jpg',
                last_content_name: 'Lesson 5',
                progress: 10,
            },
        ];
        return (
            <div className="courses-container">
                <h2>我的课程</h2>
                <Row className="courses-list">
                    {courses.map(course => {
                        return (
                            <Column122 key={course.id} className="courses-item">
                                <div
                                    className="course-img"
                                    style={{
                                        background: `url("${
                                            course.img
                                        }") center center / cover no-repeat`,
                                    }}
                                />
                                <div className="course-meta">
                                    <TextFix>{course.name}</TextFix>
                                    <div className="progress">
                                        进度 {course.last_content_name}
                                    </div>
                                </div>
                            </Column122>
                        );
                    })}
                </Row>
            </div>
        );
    }
}

export default CoursesContainer;

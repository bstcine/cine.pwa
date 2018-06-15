import React, { Component } from 'react';
import { Grid, Column122 } from '@/component/GGrid';
import TextFix from '@/component/TextFix';

class CoursesContainer extends Component {
    render() {
        const courses = [
            {
                id: '42',
                name: '中午农庄',
                img: 'http://www.bstcine.com/f/2018/05/31/155700603SE2Vwgk.jpg',
                last_content_name: 'Lesson 1',
                progress: 100,
                expire_at: '2018/05/04',
            },
            {
                id: '41',
                name: '中午农庄1',
                img: 'http://www.bstcine.com/f/2018/05/31/155700603SE2Vwgk.jpg',
                last_content_name: 'Lesson 3',
                progress: 20,
                expire_at: '2018/05/04',
            },
            {
                id: '4',
                name: '中午农2庄',
                img: 'http://www.bstcine.com/f/2018/05/31/155700603SE2Vwgk.jpg',
                last_content_name: 'Lesson 4',
                progress: 30,
                expire_at: '2018/05/04',
            },
            {
                id: '45',
                name: '中午农33庄',
                img: 'http://www.bstcine.com/f/2018/05/31/155700603SE2Vwgk.jpg',
                last_content_name: 'Lesson 5',
                progress: 10,
                expire_at: '2018/05/04',
            },
        ];
        return (
            <div className="courses-container">
                <h2>我的课程</h2>
                <Grid className="courses-list">
                    {courses.map(course => {
                        return (
                            <Column122
                                key={course.id}
                                className="courses-item"
                                href={'/learn/lesson/' + course.id}>
                                <div
                                    className="course-img"
                                    style={{
                                        background: `url("${
                                            course.img
                                        }") center center / cover no-repeat`,
                                    }}>
                                    <i />
                                </div>
                                <div className="course-meta">
                                    <TextFix>{course.name}</TextFix>
                                    <div className="progress">
                                        <div className="progressbar" />
                                    </div>
                                    <div className="status">
                                        进度 {course.last_content_name}
                                    </div>
                                    <div className="expire_at">
                                        有效期 {course.expire_at}
                                    </div>
                                </div>
                            </Column122>
                        );
                    })}
                </Grid>
            </div>
        );
    }
}

export default CoursesContainer;

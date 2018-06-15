import React from 'react';
import { Grid, Column122 } from '@/component/GGrid';
import TextFix from '@/component/TextFix';

const Courses = ({ courses }) => {
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
                                    background: `url("http://www.bstcine.com/f/${
                                        course.img
                                    }") center center / cover no-repeat`,
                                }}>
                                <i />
                            </div>
                            <div className="course-meta">
                                <TextFix className="course-title">
                                    {course.name}
                                </TextFix>
                                <div className="progress">
                                    <div
                                        className="progressbar"
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </div>
                                <div className="status">
                                    进度 {course.last_content}
                                </div>
                                {course.expire_at && (
                                    <div className="expire_at">
                                        有效期{' '}
                                        {course.expire_at.substring(0, 10)}
                                    </div>
                                )}
                            </div>
                        </Column122>
                    );
                })}
            </Grid>
        </div>
    );
};

export default Courses;

import React from 'react';
// import { CCard } from '@/component/_base';
import TextFix from '@/component/TextFix';
import { CPanel, CCard, CCardContainer } from '@/component/_base';
import siteCodeUtil from '@/util/sitecodeUtil';
import BRIDGE_EVENT from '@/constant/bridgeEvent';
import Bridge from '@/util/bridge';

const Courses = ({ courses }) => {
    const goClick = course => {
        console.log(course);
        if (siteCodeUtil.inAndroidAPP()) {
            Bridge.android(BRIDGE_EVENT.LEARN, {
                course_id: course.id,
                course_name: course.name,
                last_lesson_id: course.last_content_id,
            }).then(res => {
                console.log(res);
            });
        } else {
            let url = '/learn/course/' + course.id;
            if (course.last_content_id) {
                url += '?lesson_id=' + course.last_content_id;
            }
            location.href = url;
        }
    };

    return (
        <CPanel title="我的课程" className="courses-container">
            <CCardContainer className="courses-list" gap="none">
                {courses.map(course => {
                    return (
                        <CCard
                            hover="lighten"
                            key={course.id}
                            className="courses-item"
                            onClick={() => goClick(course)}
                        >
                            <div
                                className="course-img"
                                style={{
                                    background: `url("//www.bstcine.com/f/${
                                        course.img
                                    }") center center / cover no-repeat`,
                                }}
                            >
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
                                {Boolean(course.last_content) && (
                                    <div className="status">
                                        进度：{course.last_content}
                                    </div>
                                )}
                                {course.expire_at && (
                                    <div className="expire_at">
                                        有效期：
                                        {course.expire_at >
                                        '2100-01-01 00:00:00'
                                            ? '长期有效'
                                            : course.expire_at.substring(0, 10)}
                                    </div>
                                )}
                            </div>
                        </CCard>
                    );
                })}
            </CCardContainer>
        </CPanel>
    );
};

export default Courses;

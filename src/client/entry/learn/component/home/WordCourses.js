import React from 'react';
import { CPanel, CCard, CCardContainer } from '@/component/_base';
import '@/entry/learn/asset/style/homeWordCourse.less';

const WordCourses = ({ courses }) => {
    const getWordCourse = course => {
        const imgbg = `url(${course.cover}) center center / cover no-repeat`;
        if (course.status === 1) {
            return (
                <a href={course.href} target="_blank">
                    <div className="img-c">
                        <div className="img" style={{ background: `${imgbg}` }} />
                    </div>
                </a>
            );
        } else {
            return (
                <div className="img-c">
                    <div className="img" style={{ background: `${imgbg}` }} />
                </div>
            );
        }
    };

    let cards = courses.map((course, i) => {
        return (
            <CCard key={i}>
                <div className="course">{getWordCourse(course)}</div>
            </CCard>
        );
    });
    return (
        <CPanel title="核心词汇">
            <CCardContainer gap="large" layout="234" line="1">
                {cards}
            </CCardContainer>
        </CPanel>
    );
};

export default WordCourses;

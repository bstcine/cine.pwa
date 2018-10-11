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

    /*     const isCine = window.location.href.toLowerCase().indexOf('www.bstcine');
    if (isCine > 0) return <div />; */

    let cards = courses.map((course, i) => {
        if (course.status !== -1) {
            return (
                <CCard key={i}>
                    <div className="course">{getWordCourse(course)}</div>
                </CCard>
            );
        } else {
            return '';
        }
    });
    return (
        <CPanel title="核心词汇">
            <CCardContainer gap="large" layout="345">
                {cards}
            </CCardContainer>
        </CPanel>
    );
};

export default WordCourses;

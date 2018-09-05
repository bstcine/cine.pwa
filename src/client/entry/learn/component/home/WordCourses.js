import React from 'react';
import { CPanel, CCard, CCardContainer } from '@/component/_base';
import '@/entry/learn/asset/style/homeWordCourse.less';

const WordCourses = ({ courses }) => {
    const getWordCourseH = (startIndex, range) => {
        return (
            <div className="course">
                <div className="top">善恩核心10000词</div>
                <div className="middle">{`${startIndex}-${range}`}</div>
                <div className="bottom">
                    <div className="linkButton">立即背单词</div>
                </div>
            </div>
        );
    };

    const getWordCourse = course => {
        // alert(JSON.stringify(course));
        let url = `/lword/course?start_index=1&range=10000`;
        return (
            <CCard hover="lighten">
                <div className="course">
                    <a href={url} target="_blank">
                        <div className="img-c">
                            <div
                                className="img"
                                style={{
                                    background: `url(${
                                        course.cover
                                    })center center / cover no-repeat `,
                                }}
                            />
                        </div>
                    </a>
                </div>
            </CCard>
        );
    };

    let cards = courses.map((course, i) => {
        return getWordCourse(course);
    });
    return (
        <CPanel title="背单词">
            <CCardContainer gap="large" layout="234">
                {cards}
            </CCardContainer>
        </CPanel>
    );
};

export default WordCourses;

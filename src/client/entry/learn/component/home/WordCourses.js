import React from 'react';
import { CPanel, CCard, CCardContainer } from '@/component/_base';
import '@/entry/learn/asset/style/homeWordCourse.less';

const WordCourses = () => {
    const getHref = (startIndex, range) => {
        let url = `/lword/course?start_index=${startIndex}&range=${range}`;
        return url;
    };

    const getWordCourse = (startIndex, range) => {
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

    return (
        <CPanel title="背单词">
            <CCardContainer gap="large" layout="234">
                <CCard hover="lighten" gap="large" href={getHref(1, 3000)}>
                    {getWordCourse(1, 3000)}
                </CCard>
                <CCard hover="lighten" href={getHref(3001, 3000)}>
                    {getWordCourse(3001, 3000)}
                </CCard>
                <CCard hover="lighten" href={getHref(6001, 4000)}>
                    {getWordCourse(6001, 3000)}
                </CCard>
                <CCard hover="lighten" href={getHref(1, 10000)}>
                    {getWordCourse(1, 10000)}
                </CCard>
            </CCardContainer>
        </CPanel>
    );
};

export default WordCourses;

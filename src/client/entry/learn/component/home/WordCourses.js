import React from 'react';
import { CPanel, CCard, CCardContainer } from '@/component/_base';

const WordCourses = () => {
    const getHref = (startIndex, range) => {
        let url = `/lword/course?start_index=${startIndex}&range=${range}`;
        return url;
    };
    return (
        <CPanel title="背单词">
            <CCardContainer className="courses-list" gap="none" layout="234">
                <CCard
                    hover="lighten"
                    className="courses-item"
                    href={getHref(1, 3000)}>
                    善恩核心单词1-3000
                </CCard>
                <CCard
                    hover="lighten"
                    className="courses-item"
                    href={getHref(3001, 3000)}>
                    善恩核心单词3001-6000
                </CCard>
                <CCard
                    hover="lighten"
                    className="courses-item"
                    href={getHref(6001, 4000)}>
                    善恩核心单词6001-10000
                </CCard>
            </CCardContainer>
        </CPanel>
    );
};

export default WordCourses;

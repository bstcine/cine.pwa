import React from 'react';
import { CPanel, CCard, CCardContainer } from '@/component/_base';
import interSiteCodeUtil from '@/util/_base/interSiteCodeUtil';
import BRIDGE_EVENT from '@/constant/bridgeEvent';
import Bridge from '@/util/_base/interBridge';
import '@/entry/learn/asset/style/homeWordCourse.less';

const WordCourses = ({ courses }) => {
    const goWordClick = course => {
        console.log(course);
        if (interSiteCodeUtil.inAndroidAPP()) {
            Bridge.android(BRIDGE_EVENT.OPEN_BROWSER, {
                url: course.href,
                title: course.title,
            }).then(res => {
                console.log(res);
            });
        } else {
            location.href = course.href;
        }
    };
    const getWordCourse = course => {
        const imgbg = `url(${course.cover}) center center / cover no-repeat`;
        if (course.status === 1) {
            return (
                <a onClick={() => goWordClick(course)} target="_blank">
                    <div className="img-c pointer">
                        <div
                            className="img"
                            style={{ background: `${imgbg}` }}
                        />
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
        <CPanel title="核心词汇" className='words-container'>
            <CCardContainer gap="" layout="345">
                {cards}
            </CCardContainer>
        </CPanel>
    );
};

export default WordCourses;

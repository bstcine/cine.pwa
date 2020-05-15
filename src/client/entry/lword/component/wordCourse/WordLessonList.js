import React from 'react';
import { CCard, CCardContainer } from '@/component/_base';
import WordLessonItem from './WordLessonItem';
import interSiteCodeUtil from '@/util/_base/interSiteCodeUtil';
import BRIDGE_EVENT from '@/constant/bridgeEvent';
import Bridge from '@/util/_base/interBridge';

class WordLessonList extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(item) {
        const { mode } = this.props;
        if (mode === 'dict') {
            location.href = `/lword?dict_category_id=${item.id}`;
        } else {
            const wlHerf = `/lword?lesson_id=${item.value}`;
            if (interSiteCodeUtil.inAndroidAPP()) {
                Bridge.android(BRIDGE_EVENT.OPEN_BROWSER, {
                    url: wlHerf,
                    title: `善恩核心10000词汇 （${item.value})`,
                }).then(res => {
                    console.log(res);
                });
            } else {
                location.href = wlHerf;
            }
        }
    }

    render() {
        const { lessons, mode } = this.props;
        return (
            <CCardContainer layout="245" gap="large">
                {lessons.map((wordLesson, i) => (
                    <CCard key={i} onClick={() => this.onClick(wordLesson)}>
                        <WordLessonItem item={wordLesson} index={i} />
                    </CCard>
                ))}
            </CCardContainer>
        );
    }
}

export default WordLessonList;

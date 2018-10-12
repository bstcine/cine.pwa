import React from 'react';
import './../../asset/style/wordCourse.less';
import { CPanel } from '@/component/_base';
import WordLessonList from './WordLessonList';

export default class WordCourse extends React.PureComponent {
    render() {
        const { lessons, courseID, lastVisitID } = this.props;
        const courseComponent = courseID.split('-');
        const start_index = parseInt(courseComponent[0], 10);
        const range = parseInt(courseComponent[1], 10);
        const end_index = start_index - 1 + range;
        const cine_word = range > 9000 ? '' : `：${start_index}-${end_index}`;
        return (
            <React.Fragment>
                {/*     <CPanel title={`善恩核心10000词汇${cine_word}`}>
                    <a href={`/quizvocab?estimate=1-10000`} target="_blank">
                        <div className="quizLink">测试你的背单词起点</div>
                    </a>
                </CPanel> */}
                <a href={`/quizvocab?estimate=1-10000`} target="_blank">
                    <div className="quizLink">测试你的背单词起点</div>
                </a>
                <WordLessonList
                    lessons={lessons}
                    layout="245"
                    lastVisitID={lastVisitID}
                />
            </React.Fragment>
        );
    }
}

import React from 'react';
import './../../asset/style/wordCourse.less';
import { CPanel } from '@/component/_base';
import WordLessonList from './WordLessonList';

export default class WordCourse extends React.PureComponent {
    render() {
        const { lessons, lastVisitID } = this.props;
        const wordLessons = lessons;
        // alert(JSON.stringify(lastVisitID));

        return (
            <React.Fragment>
                <CPanel title="Top1000词汇：1-3000">
                    <a href="/quizvocab?estimate=1-3000" target="_blank">
                        <div className="quizLink">测试你的背单词起点</div>
                    </a>

                    <WordLessonList lessons={wordLessons} layout="245" />
                </CPanel>
            </React.Fragment>
        );
    }
}

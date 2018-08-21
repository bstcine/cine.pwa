import React from 'react';
import './../../asset/style/wordCourse.less';
import { CPanel } from '@/component/_base';
import WordLessonList from './WordLessonList';

export default class WordCourse extends React.PureComponent {
    render() {
        const { lessons, courseID } = this.props;
        const wordLessons = lessons;
        return (
            <React.Fragment>
                <CPanel title={`Top1000词汇：${courseID}`}>
                    <a href={`/quizvocab?estimate=${courseID}`} target="_blank">
                        <div className="quizLink">测试你的背单词起点</div>
                    </a>

                    <WordLessonList lessons={wordLessons} layout="245" />
                </CPanel>
            </React.Fragment>
        );
    }
}

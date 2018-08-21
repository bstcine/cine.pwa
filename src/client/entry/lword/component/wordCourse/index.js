import React from 'react';
import './../../asset/style/wordCourse.less';
import { CPanel } from '@/component/_base';
import WordLessonList from './WordLessonList';

export default class WordCourse extends React.PureComponent {
    render() {
        const { estimate, items } = this.props;
        // alert(JSON.stringify(items));
        const wordLessons = items;
        // alert(JSON.stringify(wordLessons));
        return (
            <React.Fragment>
                <CPanel title={`Top1000词汇：${estimate}`}>
                    <a href={`/quizvocab?estimate=${estimate}`} target="_blank">
                        <div className="quizLink">测试你的背单词起点</div>
                    </a>

                    <WordLessonList lessons={wordLessons} layout="245" />
                </CPanel>
            </React.Fragment>
        );
    }
}

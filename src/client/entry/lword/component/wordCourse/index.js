import React from 'react';
import './../../asset/style/wordCourse.less';
import { CPanel } from '@/component/_base';
import WordLessonList from './WordLessonList';

export default class WordCourse extends React.PureComponent {
    render() {
        const { lessons, courseID } = this.props;
        const courseComponent = courseID.split('-');
        let start_index = parseInt(courseComponent[0], 10);
        let range = parseInt(courseComponent[1], 10);
        let end_index = start_index - 1 + range;
        return (
            <React.Fragment>
                <CPanel title={`Top1000词汇：${start_index}-${end_index}`}>
                    <a href={`/quizvocab?estimate=${courseID}`} target="_blank">
                        <div className="quizLink">测试你的背单词起点</div>
                    </a>

                    <WordLessonList lessons={lessons} layout="245" />
                </CPanel>
            </React.Fragment>
        );
    }
}

import React from 'react';
import './../../asset/style/wordCourse.less';
import { CPanel } from '@/component/_base';
import WordLessonList from './WordLessonList';

export default class WordCourse extends React.PureComponent {
    render() {
        const { items } = this.props;
        const wordLessons = items.toJS();
        // alert(JSON.stringify(wordLessons));
        return (
            <React.Fragment>
                <CPanel title="Top1000词汇：1-3000" >
                    <WordLessonList lessons={wordLessons} layout="234" />
                </CPanel>
            </React.Fragment>
        );
    }
}

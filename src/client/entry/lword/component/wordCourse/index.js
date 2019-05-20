import React from 'react';
import './../../asset/style/wordCourse.less';
import WordLessonList from './WordLessonList';
import { CPanel } from '@/component/_base';

export default class WordCourse extends React.PureComponent {
    render() {
        const { lessons, mode, name, lastVisitID } = this.props;
        return (
            <React.Fragment>
                <CPanel
                    title={name}
                    ext={
                        mode !== 'dict' && (
                            <a
                                style={{ color: '#1b71db' }}
                                href="/quizvocab?estimate=1-10000"
                                target="_blank"
                            >
                                测试你的背单词起点
                            </a>
                        )
                    }
                >
                    <WordLessonList
                        mode={mode}
                        lessons={lessons}
                        lastVisitID={lastVisitID}
                    />
                </CPanel>
            </React.Fragment>
        );
    }
}

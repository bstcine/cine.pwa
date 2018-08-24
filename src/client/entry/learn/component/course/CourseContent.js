import React, { PureComponent } from 'react';
import { CPanel } from '@/component/_base';
import { withRouter } from 'react-router';
import LessonKj from '@/entry/learn/component/course/LessonKj';
import LessonHTML from '@/entry/learn/component/course/LessonHTML';
import LessonVocab from '@/entry/learn/component/course/LessonVocab';
import LessonQuiz from '@/entry/learn/component/course/LessonQuiz';

const LESSON_TYPE = {
    KJ: '2',
    HTML: '3',
    VOCAB: '5',
    QUIZ: '6',
};
/**
 * 右侧主体区域
 */
class CourseContent extends PureComponent {
    renderLesson(detail) {
        console.log('renderLesson', detail);

        switch (detail.type) {
            case LESSON_TYPE.KJ:
                return <LessonKj detail={detail} />;
            case LESSON_TYPE.HTML:
                return <LessonHTML detail={detail} />;
            case LESSON_TYPE.VOCAB:
                return <LessonVocab detail={detail} />;
            case LESSON_TYPE.QUIZ:
                return <LessonQuiz detail={detail} />;
            default:
                return <div>NO_SUPPORT_LESSON_TYPE: {detail.type}</div>;
        }
    }

    render() {
        console.log('render CourseContent');
        const { lessonDetail } = this.props;
        return (
            <CPanel
                title={lessonDetail ? lessonDetail.name : ''}
                className="course__content">
                {lessonDetail ? this.renderLesson(lessonDetail) : 'Loading'}
            </CPanel>
        );
    }
}

export default withRouter(CourseContent);

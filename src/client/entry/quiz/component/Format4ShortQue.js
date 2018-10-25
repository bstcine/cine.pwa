import React from 'react';
import QuestionTitle from './QuestionTitle';
import QuestionText from './QuestionText';
import FeedbackText from './FeedbackText';
import { CurrentQuizState } from '@/constant/quiz';

/**
 * 4:简答题
 */
const Format4ShortQue = ({
    no,
    title,
    feedback,
    need_feedback,
    text_value,
    is_text_correct,
    answer_feedback,
    currentQuizState,
    saveQuestion4TextValue,
    saveQuestionFeedback,
}) => {
    console.log('Question4ShortQue render');
    let waiting_and_not_need_feedback =
        currentQuizState === CurrentQuizState.WAITING4CHECK &&
        need_feedback === '0';

    return (
        <div className="questionformat questionformat1">
            <QuestionTitle no={no} title={title} />
            <QuestionText
                hint={'答题区：'}
                text_value={text_value}
                editable={currentQuizState === CurrentQuizState.ANSWERING}
                onChange={saveQuestion4TextValue}
            />

            {/* 学生提交后且不需要批改且有解析 或 老师批改中 或 学生检阅中 */}
            {((waiting_and_not_need_feedback && feedback) ||
                currentQuizState === CurrentQuizState.CHECKING ||
                (currentQuizState === CurrentQuizState.REVIEWING &&
                    (answer_feedback || feedback))) && (
                <FeedbackText
                    editable={currentQuizState === CurrentQuizState.CHECKING}
                    feedback={answer_feedback || feedback}
                    is_select_correct={is_text_correct}
                    onChange={saveQuestionFeedback}
                />
            )}

            {/* 学生提交后且需要批 显示 老师批改中... */}
            {currentQuizState === CurrentQuizState.WAITING4CHECK &&
                need_feedback === '1' && (
                    <div style={{ color: '#ff0000' }}>老师批改中...</div>
                )}
        </div>
    );
};

export default Format4ShortQue;

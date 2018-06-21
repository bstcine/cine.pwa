import React from 'react';
import QuestionTitle from './QuestionTitle';
import QuestionText from './QuestionText';
import FeedbackText from './FeedbackText';
import { CurrentQuizState } from '@/constant';

/**
 * 4:简答题
 */
const Format4ShortQue = ({
    no,
    id,
    title,
    feedback,
    need_feedback,
    select_value,
    text_value,
    is_select_correct,
    is_text_correct,
    select_score,
    text_score,
    answer_feedback,
    currentQuizState,
    saveQuestion4TextValue,
    saveQuestionFeedback,
}) => {
    console.log(
        'Question4ShortQue render',
        feedback,
        need_feedback,
        answer_feedback
    );
    let waiting_and_not_need_feedback =
        currentQuizState === CurrentQuizState.WAITING4CHECK &&
        need_feedback &&
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

            {!answer_feedback &&
                feedback &&
                waiting_and_not_need_feedback && (
                <FeedbackText hint={'默认解析'} feedback={feedback} />
            )}

            {((currentQuizState === CurrentQuizState.REVIEWING &&
                answer_feedback) ||
                currentQuizState === CurrentQuizState.CHECKING) && (
                <FeedbackText
                    editable={currentQuizState === CurrentQuizState.CHECKING}
                    feedback={answer_feedback}
                    onChange={saveQuestionFeedback}
                />
            )}
        </div>
    );
};

export default Format4ShortQue;

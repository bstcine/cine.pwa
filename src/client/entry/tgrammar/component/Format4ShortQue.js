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
    select_value,
    text_value,
    is_select_correct,
    is_text_correct,
    select_score,
    text_score,
    feedback,
    currentQuizState,
    saveQuestion4TextValue,
    saveQuestionFeedback,
}) => {
    console.log('Question4ShortQue render');
    return (
        <div className="questionformat questionformat1">
            <QuestionTitle no={no} title={title} />
            <QuestionText
                hint={'答题区：'}
                text_value={text_value}
                editable={currentQuizState === CurrentQuizState.ANSWERING}
                onChange={saveQuestion4TextValue}
            />

            {((currentQuizState === CurrentQuizState.REVIEWING && feedback) ||
                currentQuizState === CurrentQuizState.CHECKING) && (
                <FeedbackText
                    editable={currentQuizState === CurrentQuizState.CHECKING}
                    feedback={feedback}
                    onChange={saveQuestionFeedback}
                />
            )}
        </div>
    );
};

export default Format4ShortQue;

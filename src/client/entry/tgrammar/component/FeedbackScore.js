import React from 'react';

const formatText = (is_select_correct, is_text_correct) => {
    if (
        (is_select_correct === 1 && is_text_correct === 1) ||
        (is_select_correct === 1 && typeof is_text_correct !== 'number')
    ) {
        return (
            <span className="correct">
                <i className="material-icons">&#xE876;</i>正确
            </span>
        );
    } else if (is_select_correct === 1 && is_text_correct === 0) {
        return (
            <span className="wrong">
                <i className="material-icons">&#xE14C;</i>选项正确，改正有误
            </span>
        );
    } else {
        return (
            <span className="wrong">
                <i className="material-icons">&#xE14C;</i>错误
            </span>
        );
    }
};

const FeedbackScore = ({
    is_select_correct,
    is_text_correct,
    select_score,
    text_score,
}) => {
    return (
        <div className="feedback-score">
            <span className="correct">
                {formatText(is_select_correct, is_text_correct)}
            </span>
            <div className="score">
                得 <span>{select_score + text_score}</span> 分
            </div>
        </div>
    );
};

export default FeedbackScore;

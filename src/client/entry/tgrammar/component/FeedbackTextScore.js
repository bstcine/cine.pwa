import React from 'react';
import SelectOption from './SelectOption';

let feedbackOptions = [
    {
        content: '修正正确，给分',
        type: 1,
        value: 1,
        className: 'button-options__option button-options__option--success',
    },
    {
        content: '修正错误，不给分',
        type: 1,
        value: 0,
        className: 'button-options__option button-options__option--danger',
    },
];

const FeedbackTextScore = ({
    id,
    editable,
    is_text_correct,
    text_score,
    onFeedbackSelectChange,
}) => {
    return (
        <div className="feedback-text-score">
            {editable && (
                <ul className="button-options">
                    {feedbackOptions.map((option, i) => {
                        return (
                            <SelectOption
                                className={option.className}
                                key={id + i}
                                name={`fs_${id}`}
                                value={option.value}
                                content={option.content}
                                checked={is_text_correct === option.value}
                                onChange={onFeedbackSelectChange}
                            />
                        );
                    })}
                </ul>
            )}
            {!editable &&
                is_text_correct === 1 && (
                <span className="correct">
                    <i className="material-icons">&#xE876;</i>正确
                </span>
            )}
            {!editable &&
                is_text_correct === 0 && (
                <span className="wrong">
                    <i className="material-icons">&#xE14C;</i>错误
                </span>
            )}

            <div className="score">
                得 <span>{text_score}</span> 分
            </div>
        </div>
    );
};

export default FeedbackTextScore;

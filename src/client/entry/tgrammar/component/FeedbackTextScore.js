import React from 'react';
import SelectOption from './SelectOption';

let feedbackOptions = [
    {
        content: '修正正确，给分',
        type: 1,
        value: 1,
        className: 'correct',
    },
    {
        content: '修正错误，不给分',
        type: 1,
        value: 0,
        className: 'wrong',
    },
];

const FeedbackTextScore = ({
    id,
    is_text_correct,
    text_score,
    onFeedbackSelectChange,
}) => {
    return (
        <div className="feedback-select-score">
            <ul className="options">
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
            <div className="score">
                得 <span>{text_score}</span> 分
            </div>
        </div>
    );
};

export default FeedbackTextScore;

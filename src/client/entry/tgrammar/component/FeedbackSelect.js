import React from 'react';
import SelectOption from './SelectOption';

let feedbackOptions = [
    {
        content: '答对',
        type: 1,
        value: 1,
        className: 'check-right',
    },
    {
        content: '答错',
        type: 1,
        value: 0,
        className: 'check-wrong',
    },
];

const FeedbackSelect = ({ id, is_correct, onFeedbackSelectChange }) => {
    return (
        <div className="feedback-select">
            <div className="tips">老师批改</div>
            <ul className="options">
                {feedbackOptions.map((option, i) => {
                    return (
                        <SelectOption
                            className={option.className}
                            key={id + i}
                            name={`fs_${id}`}
                            value={option.value}
                            onChange={onFeedbackSelectChange}
                            content={option.content}
                            checked={is_correct === option.value}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default FeedbackSelect;

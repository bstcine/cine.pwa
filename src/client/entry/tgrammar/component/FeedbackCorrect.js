import React from 'react';
import SelectOption from './SelectOption';

const FeedbackCorrect = ({ id, options, select_value }) => {
    return (
        <div className="feedback-correct">
            <div className="tips">正确答案</div>
            <fieldset disabled>
                <ul className="options">
                    {options.map((option, i) => {
                        return (
                            <SelectOption
                                key={id + i}
                                index={i}
                                name={'fc_' + id}
                                value={option.value}
                                readOnly={true}
                                checked={option.isCorrect}
                            />
                        );
                    })}
                </ul>
            </fieldset>
        </div>
    );
};

export default FeedbackCorrect;

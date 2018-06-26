import React from 'react';
import SelectOption from './SelectOption';

const QuestionSelect = ({ id, editable, options, select_value, onChange }) => {
    return (
        <div className="question-select">
            <fieldset disabled={!editable}>
                <ul className="options">
                    {options.map((option, i) => {
                        return (
                            <SelectOption
                                key={id + i}
                                index={i}
                                name={'qid' + id}
                                value={option.value}
                                onChange={onChange}
                                content={option.content}
                                checked={select_value === option.value}
                            />
                        );
                    })}
                </ul>
            </fieldset>
        </div>
    );
};

export default QuestionSelect;

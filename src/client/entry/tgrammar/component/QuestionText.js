import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';

const QuestionText = ({ editable, text_value, onChange }) => {
    return (
        <div className="question-text">
            <span>修正错误：</span>
            {editable ? (
                <TextareaAutosize
                    value={text_value || ''}
                    onChange={onChange}
                />
            ) : (
                <div
                    className="textarea"
                    dangerouslySetInnerHTML={{ __html: text_value }}
                />
            )}
        </div>
    );
};

export default QuestionText;

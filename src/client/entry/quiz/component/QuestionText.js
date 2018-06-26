import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';

const QuestionText = ({ hint, editable, text_value, onChange }) => {
    return (
        <div className="question-text">
            <span>{hint || '修正错误：'}</span>
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

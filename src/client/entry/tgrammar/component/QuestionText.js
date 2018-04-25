import React from 'react';

const QuestionText = ({ editable, text_value, onTextChange }) => {
    return (
        <div className="question-text">
            <span>修正错误：</span>
            {editable ? (
                <textarea value={text_value || ''} onChange={onTextChange} />
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

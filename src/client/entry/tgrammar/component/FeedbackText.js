import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';

const FeedbackText = ({ feedback, editable, onFeedbackTextChange }) => {
    return (
        <div className="feedback-text">
            <span>
                老师解答 <i className="material-icons">&#xE87F;</i>
            </span>
            {editable ? (
                <TextareaAutosize
                    value={feedback || ''}
                    onChange={onFeedbackTextChange}
                />
            ) : (
                <div
                    className="textarea"
                    dangerouslySetInnerHTML={{ __html: feedback }}
                />
            )}
        </div>
    );
};

export default FeedbackText;

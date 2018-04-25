import React from 'react';

const FeedbackText = ({ feedback, editable, onFeedbackTextChange }) => {
    return (
        <div className="feedback-text">
            <span>
                老师解答 <i className="material-icons">&#xE87F;</i>
            </span>
            {editable ? (
                <textarea
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

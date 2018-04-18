import React from 'react';

const FeedbackText = ({feedback, readOnly, onFeedbackTextChange}) => {
    return (
        <div className="feedback-text">
            <div className="tips">老师解答</div>
            <textarea className="feedbackarea" value={feedback || ''} readOnly={readOnly} onChange={onFeedbackTextChange} />
        </div>
    );
};

export default FeedbackText;
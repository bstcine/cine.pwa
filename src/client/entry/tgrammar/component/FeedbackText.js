import React from 'react';
import classNames from 'classnames';
import TextareaAutosize from 'react-autosize-textarea';

const FeedbackText = ({ feedback, editable, onChange, is_select_correct }) => {
    return (
        <div
            className={classNames('feedback-text', {
                'feedback-text__correct': is_select_correct,
            })}>
            <span>
                老师解答 <i className="material-icons">&#xE87F;</i>
            </span>
            {editable ? (
                <TextareaAutosize value={feedback || ''} onChange={onChange} />
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

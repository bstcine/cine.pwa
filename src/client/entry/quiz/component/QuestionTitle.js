import React from 'react';

const QuestionTitle = ({ no, title }) => {
    return (
        <div className="question-title">
            <span className="question-no">{no}.</span>
            <div
                className="question-content"
                dangerouslySetInnerHTML={{ __html: title }}
            />
        </div>
    );
};

export default QuestionTitle;

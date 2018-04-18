import React from 'react';

const QuestionTitle = ({no, title}) => {
    return (
        <div className="titlewrap">
            <span className="questionno">{no}.</span>
            <div className="title" dangerouslySetInnerHTML={{__html: title}} />
        </div>
    );
};

export default QuestionTitle;
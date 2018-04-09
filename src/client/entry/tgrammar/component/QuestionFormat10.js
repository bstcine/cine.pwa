import React from 'react';
/**
 * 描述文本（富文本）
 */
const QuestionFormat10 = ({title}) => {
    return <div className="questionformat10" dangerouslySetInnerHTML={{__html: title}} />;
};

export default QuestionFormat10;

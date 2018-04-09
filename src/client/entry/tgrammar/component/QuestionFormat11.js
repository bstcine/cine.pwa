import React from 'react';
/**
 * 阅读理解描述文本(富文本)
 */
const QuestionFormat11 = ({title}) => {
    return <div className="questionformat10" dangerouslySetInnerHTML={{__html: title}} />;
};

export default QuestionFormat11;

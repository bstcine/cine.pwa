import React from 'react';
/**
 * 阅读理解描述文本(富文本)
 */
const Question11ReadDesc = ({title}) => {
    return <div className="questionformat11" dangerouslySetInnerHTML={{__html: title}} />;
};

export default Question11ReadDesc;

import React from 'react';
/**
 * 描述文本（富文本）
 */
const Question10Desc = ({title}) => {
    console.log('Question10Desc render');
    return <div className="questionformat10" dangerouslySetInnerHTML={{__html: title}} />;
};

export default Question10Desc;

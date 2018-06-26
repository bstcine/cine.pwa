import React from 'react';
/**
 * 阅读理解描述文本(富文本)
 */
const Format11ReadingDesc = ({ title }) => {
    console.log('Question11ReadDesc render');
    return (
        <div
            className="questionformat11"
            dangerouslySetInnerHTML={{ __html: title }}
        />
    );
};

export default Format11ReadingDesc;

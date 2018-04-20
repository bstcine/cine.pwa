import React from 'react';
/**
 * 阅读理解描述文本(富文本)
 */
const Question11ReadingDesc = ({ item }) => {
    console.log('Question11ReadDesc render');
    let { title } = item;
    return (
        <div
            className="questionformat11"
            dangerouslySetInnerHTML={{ __html: title }}
        />
    );
};

export default Question11ReadingDesc;

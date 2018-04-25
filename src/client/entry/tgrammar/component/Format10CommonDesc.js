import React from 'react';
/**
 * 描述文本（富文本）
 */
const Format10CommonDesc = ({ item }) => {
    console.log('Question10Desc render');
    let { title } = item;
    return (
        <div
            className="questionformat10"
            dangerouslySetInnerHTML={{ __html: title }}
        />
    );
};

export default Format10CommonDesc;

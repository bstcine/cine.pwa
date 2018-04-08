import React from 'react';

const Title = ({title, date, limit, count}) => {
    return (
        <div>
            <h1>{title}</h1>
            <div className="metas">
                <span className="meta">做题时间：{date}</span>
                <span className="meta">限时：{limit}分钟</span>
                <span className="meta right">共{count}题</span>
            </div>
        </div>
    );
};

export default Title;

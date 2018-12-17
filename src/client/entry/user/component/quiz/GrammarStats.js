import React from 'react';
import commonUtil from '@/util/_base/commonUtil';

const statusMap = {
    '0': '答题中',
    '1': '待批改',
    '2': '批改中',
    '3': '已批改',
};

const GrammarStats = ({ list }) => {
    if (list && list.length > 0) {
        return list.map(item => {
            return (
                <a
                    href={`/quiz/grammar?stats_content_quiz_id=${item.id}`}
                    key={item.id}
                >
                    <li className="table-tr">
                        <span>{commonUtil.shortTime(item.create_at)}</span>
                        <span>
                            {commonUtil.durationShortFormat(item.duration)}
                        </span>
                        <span className="score">{item.score}</span>
                        <span className={`status__${item.status}`}>
                            {statusMap[item.status]}
                        </span>
                    </li>
                </a>
            );
        });
    } else {
        return (
            <li className="table-tr">
                <span>暂无数据</span>
            </li>
        );
    }
};

export default GrammarStats;

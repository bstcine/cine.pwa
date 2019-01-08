import React from 'react';
import commonUtil from '@/util/_base/commonUtil';

const QuizVocabStats = ({ list }) => {
    if (list && list.length > 0) {
        return list.map(item => {
            return (
                <a href={`/quizvocab/report?id=${item.id}`} key={item.id}>
                    <li className="table-tr">
                        <span>{commonUtil.shortTime(item.create_at)}</span>
                        <span>
                            {commonUtil.durationShortFormat(item.duration)}
                        </span>
                        <span className="score">{item.vocab}</span>
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

export default QuizVocabStats;

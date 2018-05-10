/**
 * Created by joe on 4/19/18.
 */
import React from 'react';
import timeUtil from '@/util/timeUtil';

const WordsTable = ({ list, wordsItemClick, ...props }) => {
    let renderList;
    if (!list.length) {
        renderList = (
            <tr>
                <td colSpan="7">没有数据...</td>
            </tr>
        );
    } else {
        renderList = list.map((item, i) => {
            return (
                <tr
                    key={item.id}
                    onClick={e => {
                        wordsItemClick(item.id, e);
                    }}>
                    <td>{i + 1}</td>
                    <td>{item.login}</td>
                    <td>{item.nickname}</td>
                    <td>
                        {item.create_at ? item.create_at.substring(0, 10) : '-'}
                    </td>
                    <td>{timeUtil.durationFormat(item.duration, 2)}</td>
                    <td>{item.vocab}</td>
                    <td>{item.teacher_nickname}</td>
                </tr>
            );
        });
    }

    return (
        <div className="report-list">
            <table className="table" style={{ width: '100%' }}>
                <caption style={{ marginTop: '.4rem', marginBottom: '.4rem' }}>
                    学生词汇量测试——测试结果
                </caption>
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>学生帐号</th>
                        <th>姓名</th>
                        <th>测试时间</th>
                        <th>测试时长</th>
                        <th>词汇量</th>
                        <th>指导老师</th>
                    </tr>
                </thead>
                <tbody>{renderList}</tbody>
            </table>
        </div>
    );
};

export default WordsTable;

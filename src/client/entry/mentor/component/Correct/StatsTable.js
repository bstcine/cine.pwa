import React from 'react';
import timeUtil from '@/util/timeUtil';
const formatGrade = grade => {
    if (grade === 0) {
        return '学龄前';
    } else if (grade === 13) {
        return '成人';
    } else {
        return `${grade}年级`;
    }
};

const formatTime = time => {
    if (time) {
        return time.substring(2, 16);
    }
};

const Score = ({ score }) => {
    return (
        <span className="red">{typeof score === 'number' ? score : '-'}</span>
    );
};

const OperationButton = ({ item }) => {
    const UNCHECK = '1';
    const CHECKING = '2';
    const CHECKED = '3';
    switch (item.status) {
        case UNCHECK:
            return (
                <button
                    className="btn btn-round"
                    onClick={e => {
                        location.href = `/quiz/grammar?stats_content_quiz_id=${
                            item.id
                        }&cmd=check`;
                    }}>
                    批改 <i className="material-icons">&#xE254;</i>
                </button>
            );
        case CHECKING:
            return (
                <button
                    className="btn btn-round btn-checking"
                    onClick={e => {
                        location.href = `/quiz/grammar?stats_content_quiz_id=${
                            item.id
                        }&cmd=check`;
                    }}>
                    批改中...
                </button>
            );
        case CHECKED:
            return (
                <button
                    className="btn btn-round btn-done"
                    onClick={e => {
                        location.href = `/quiz/grammar?stats_content_quiz_id=${
                            item.id
                        }&cmd=check`;
                    }}>
                    已批改 <i className="material-icons">&#xE876;</i>
                </button>
            );
        default:
            return null;
    }
};

const StatsTable = ({ list = [] }) => {
    return (
        <div className="tgrammar-list">
            <table border="1">
                <caption style={{ marginTop: '.4rem', marginBottom: '.4rem' }}>
                    学生英语文法和阅读基础能力测试——批改结果
                </caption>
                <tbody>
                    <tr>
                        <th>编号</th>
                        <th>学生账号</th>
                        <th>姓名</th>
                        <th>年级</th>
                        <th>用时</th>
                        <th>提交时间</th>
                        <th>得分</th>
                        <th>指导老师</th>
                        <th>批改老师</th>
                        <th>操作</th>
                    </tr>
                    {list.map((item, i) => {
                        return (
                            <tr key={item.id}>
                                <td>{i + 1}</td>
                                <td>{item.login && item.login.slice(-10)}</td>
                                <td>{item.nickname || '-'}</td>
                                <td>{formatGrade(item.grade)}</td>
                                <td>
                                    {timeUtil.durationShortFormat(
                                        item.duration
                                    )}
                                </td>
                                <td>{formatTime(item.create_at)}</td>
                                <td>
                                    <Score score={item.score} />
                                </td>
                                <td>{item.teacher_nickname}</td>
                                <td>{item.checker_nickname}</td>
                                <td>
                                    <OperationButton item={item} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default StatsTable;

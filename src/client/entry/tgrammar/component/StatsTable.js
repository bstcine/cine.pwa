import React from 'react';

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

const Operation = ({ item }) => {
    const UNCHECK = '1';
    const CHECKING = '2';
    const CHECKED = '3';
    switch (item.status) {
        case UNCHECK:
            return (
                <button
                    className="btn btn-round"
                    onClick={e => {
                        location.href = `/tgrammar/quiz?stats_quiz_id=${
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
                        location.href = `/tgrammar/quiz?stats_quiz_id=${
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
                        location.href = `/tgrammar/quiz?stats_quiz_id=${
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

const StatsTable = ({ title, list = [], onClick }) => {
    return (
        <div className="tgrammar-list">
            <table border="1">
                <caption>学生英语文法和阅读基础能力测试——批改结果</caption>
                <tbody>
                    <tr>
                        <th>编号</th>
                        <th>学生账号</th>
                        <th>姓名</th>
                        <th>年级</th>
                        <th>考试时长</th>
                        <th>提交时间</th>
                        <th>批改老师</th>
                        <th>得分</th>
                        <th>批改操作</th>
                    </tr>
                    {list.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>
                                    {item.phone || item.email || item.login}
                                </td>
                                <td>{item.nickname}</td>
                                <td>{formatGrade(item.grade)}</td>
                                <td>{item.duration}</td>
                                <td>{formatTime(item.create_at)}</td>
                                <td>{item.t_nickname}</td>
                                <td>
                                    <span className="red">
                                        {item.score || '-'}
                                    </span>
                                </td>
                                <td>
                                    <Operation item={item} />
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

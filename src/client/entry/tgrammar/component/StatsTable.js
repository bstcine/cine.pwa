import React from 'react';
const convGrade = grade => {
    if (grade === 0) {
        return '学龄前';
    } else if (grade === 13) {
        return '成人';
    } else {
        return `${grade}年级`;
    }
};

const Operation = ({item}) => {
    if (item.status === '2') {
        return <button
            className="btn btn-round btn-done"
            onClick={e => {
                location.href = `/tgrammar/quiz?stats_quiz_id=${item.id}&cmd=check`;
            }}
        >
        已批改 <i className="material-icons">&#xE876;</i>
        </button>;

        // <span className="red">已批改 <i className="material-icons">&#xE876;</i></span>;
    } else {
        return (
            <button
                className="btn btn-round"
                onClick={e => {
                    location.href = `/tgrammar/quiz?stats_quiz_id=${item.id}&cmd=check`;
                }}
            >
                批改 <i className="material-icons">&#xE254;</i>
            </button>
        );
    }
};

const StatsTable = ({title, list = [], onClick}) => {
    return (
        <div className="tgrammar-list">
            <table border="1">
                <caption>学生英语文法和阅读基础能力测试——批改结果</caption>
                <tbody>
                    <tr>
                        <th>编号</th>
                        <th>学生姓名</th>
                        <th>年级</th>
                        <th>创建时间</th>
                        <th>得分</th>
                        <th>操作</th>
                    </tr>
                    {list.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nickname || item.phone || item.email || item.user_id}</td>
                                <td>{convGrade(item.grade)}</td>
                                <td>{item.create_at}</td>
                                <td><span className="red">{item.score || '-'}</span></td>
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

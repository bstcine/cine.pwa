/**
 * Created by joe on 4/19/18.
 */
import React from 'react';

const gradeArr = {
    '0': '学龄前',
    '1': '一年级',
    '2': '二年级',
    '3': '三年级',
    '4': '四年级',
    '5': '五年级',
    '6': '六年级',
    '7': '七年级',
    '8': '八年级',
    '9': '九年级',
    '10': '十年级',
    '11': '十一年级',
    '12': '十二年级',
    '13': '成人',
};

const StudentTable = ({ list, ...props }) => {
    if (!list || !list.length) {
        return <div> 没有数据...</div>;
    }

    return (
        <div className="studentList">
            {list.map((item, key) => (
                <div key={key} className={'studentPanel'}>
                    <div className={'studentInfo'}>
                        <span>{key + 1}</span>
                        <span>
                            {item.student_nickname || item.student_phone}
                        </span>
                        <span>{gradeArr[item.student_grade] || '暂无'}</span>
                        <span>{item.teacher_nickname}</span>
                    </div>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default StudentTable;

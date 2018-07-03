/**
 * Created by joe on 4/19/18.
 */
import React from 'react';
import classNames from 'classnames';
import { Task_Type } from '@/constant';

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

const taskType = {
    '1': '视频',
    '2': '习题',
    '3': '习题反馈',
    '4': '单词',
    '9': '其他',
};

const taskStatus = {
    '0': '未完成',
    '1': '进行中',
    '2': '已完成',
};

const quizStatus = {
    '0': '答题中',
    '1': '待批改',
    '2': '批改中',
    '3': '已批改',
};

const getHref = (task, student_id) => {
    switch (task.type) {
        case Task_Type.Video:
            return `/learn/course/${task.course_id}?lesson_id=${
                task.lesson_id
            }`;
        case Task_Type.Quiz:
        case Task_Type.Quiz_Feedback: {
            const map = {
                '1': 'lesson_id',
                '2': 'chapter_id',
                '3': 'course_id',
                '4': 'quiz_id',
                '5': 'stats_content_quiz_id',
            };
            if (['1', '2', '3'].includes(task.object_type)) {
                return `/quiz/kj?user_id=${student_id}&${
                    map[task.object_type]
                }=${task.object_id}&cmd=check`;
            } else {
                return `/quiz/grammar?user_id=${student_id}&${
                    map[task.object_type]
                }=${task.object_id}&cmd=check`;
            }
        }
        case Task_Type.Word:
            if (task.word_start_index && task.word_end_index) {
                return `/learn/word?start_index=${
                    task.word_start_index
                }&end_index=${task.word_end_index}`;
            } else {
                return `/learn/word?word_type=${task.object_id}`;
            }
    }
};

const taskOnClick = (task, student_id) => {
    window.open(getHref(task, student_id));
};

const StudentTable = ({ list, ...props }) => {
    if (!list || !list.length) {
        return <div> 没有数据...</div>;
    }

    return (
        <React.Fragment>
            {list.map((student, key) => (
                <div key={key} className={'studentPanel'}>
                    <div className={'studentInfo'}>
                        <span>{key + 1}</span>
                        <span>
                            {student.student_nickname ||
                                student.student_name ||
                                student.student_login ||
                                student.student_phone ||
                                '未知'}
                        </span>
                        <span>
                            {gradeArr[student.student_grade] || '无年级'}
                        </span>
                        <span>{student.teacher_nickname}</span>
                    </div>
                    <hr className={'hr1'} />
                    <div className={'studentHeader'}>
                        <h4>本周作业</h4>
                        <label
                            onClick={() => {
                                window.open(
                                    `/learn/task?user_id=${student.student_id}`
                                );
                            }}>
                            全部&gt;
                        </label>
                    </div>
                    <br />
                    {student.tasks &&
                        student.tasks.map((task, key) => (
                            <React.Fragment key={key}>
                                <div
                                    className={classNames('taskPanel', {
                                        click:
                                            ['1', '4'].includes(task.type) ||
                                            (task.type === '2' &&
                                                task.status === '2'),
                                    })}
                                    onClick={() => {
                                        if (
                                            ['1', '4'].includes(task.type) ||
                                            (task.type === '2' &&
                                                task.status === '2')
                                        ) {
                                            taskOnClick(
                                                task,
                                                student.student_id
                                            );
                                        }
                                    }}>
                                    <div className={'task-type'}>
                                        {taskType[task.type]}
                                    </div>
                                    <div className={'task-title'}>
                                        {task.title}
                                    </div>
                                    <div
                                        className={classNames(
                                            'task-status',
                                            ['red', 'red', 'green'][task.status]
                                        )}>
                                        {taskStatus[task.status]}
                                    </div>
                                    <div
                                        className={classNames(
                                            'task-todo',
                                            { blue: task.status === '0' },
                                            {
                                                red:
                                                    task.type === '2' &&
                                                    (task.status_status ||
                                                        '1') === '1',
                                            }
                                        )}>
                                        {task.status === '0'
                                            ? '提醒'
                                            : task.type === '2' &&
                                              quizStatus[
                                                  task.stats_status || '1'
                                              ]}
                                    </div>
                                </div>
                                <hr className={'hr2'} />
                            </React.Fragment>
                        ))}
                </div>
            ))}
        </React.Fragment>
    );
};

export default StudentTable;

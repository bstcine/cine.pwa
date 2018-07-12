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
    '3': '反馈',
    '4': '单词',
    '5': '习题',
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
            return `/learn/course/${task.course_id}?task_id=${
                task.id
            }&user_id=${student_id}&lesson_id=${task.lesson_id}`;
        case Task_Type.Quiz:
            return `/quiz/kj?task_id=${
                task.id
            }&user_id=${student_id}&cmd=check`;
        case Task_Type.Quiz_Feedback: {
            return `/quiz/kj?task_id=${
                task.id
            }&user_id=${student_id}&stats_content_quiz_id=${
                task.object_id
            }&cmd=check`;
        }
        case Task_Type.Word:
            if (task.word_start_index && task.word_end_index) {
                return `/learn/word?task_id=${
                    task.id
                }&user_id=${student_id}&start_index=${
                    task.word_start_index
                }&end_index=${task.word_end_index}`;
            } else {
                return `/learn/word?task_id=${
                    task.id
                }&user_id=${student_id}&word_type=${task.object_id}`;
            }
    }
};

const taskOnClick = (task, student_id) => {
    window.open(getHref(task, student_id));
};

const StudentTable = ({ list, actions }) => {
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
                        student.tasks.map((task, key) => {
                            let todoLint;
                            if (task.status === '0') {
                                if (task.type === '5') {
                                    todoLint = '待确认';
                                } else {
                                    todoLint = '提醒';
                                }
                            } else {
                                if (task.type === '5') {
                                    todoLint = '已确认';
                                } else if (task.type === '2') {
                                    todoLint =
                                        quizStatus[task.stats_status || '1'];
                                    if (task.stats_status === '3') {
                                        todoLint =
                                            task.stats_is_auto_correct === '1'
                                                ? '自动批改'
                                                : '已批改';
                                    }
                                }
                            }

                            return (
                                <React.Fragment key={key}>
                                    <div
                                        className={classNames('taskPanel', {
                                            click: [
                                                '1',
                                                '2',
                                                '3',
                                                '4',
                                            ].includes(task.type),
                                        })}
                                        onClick={() => {
                                            if (
                                                ['1', '2', '3', '4'].includes(
                                                    task.type
                                                )
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
                                        <div className={'task-expire'}>
                                            {task.expire_at}
                                        </div>
                                        <div
                                            className={classNames(
                                                'task-status',
                                                ['red', 'red', 'green'][
                                                    task.status
                                                ]
                                            )}>
                                            {taskStatus[task.status]}
                                        </div>
                                        <div
                                            className={classNames(
                                                'task-todo',
                                                {
                                                    gray:
                                                        task.type !== '5' &&
                                                        task.status === '0',
                                                },
                                                {
                                                    red:
                                                        task.type === '2' &&
                                                        task.status === '2' &&
                                                        ['1', '2'].includes(
                                                            task.stats_status
                                                        ),
                                                },
                                                {
                                                    red:
                                                        task.type === '5' &&
                                                        task.status === '0',
                                                }
                                            )}
                                            onClick={() => {
                                                if (
                                                    task.type === '5' &&
                                                    task.status === '0'
                                                ) {
                                                    actions.fetchMentorCorrectPdfTask(
                                                        task
                                                    );
                                                }
                                            }}>
                                            {todoLint}
                                        </div>
                                    </div>
                                    <hr className={'hr2'} />
                                </React.Fragment>
                            );
                        })}
                </div>
            ))}
        </React.Fragment>
    );
};

export default StudentTable;

import React from 'react';
import TextFix from '@/component/TextFix';
import { Task_Type } from '@/constant';
import { Column112 } from '@/component/CGrid';
import { CIcon } from '@/component/_base';

const Label = ({ type }) => {
    const map = {
        '1': '视频',
        '2': '习题',
        '3': '反馈',
        '4': '单词',
        '5': '习题',
        '9': '其他',
    };
    return <span className="label">{map[type]}</span>;
};

const Status = ({ task }) => {
    if (task.status === '0' || task.status === '1') {
        return task.type === '3' ? (
            <span className="task-opration">查看</span>
        ) : (
            <span className="task-opration">待完成</span>
        );
    } else {
        return <CIcon className="task-opration">ci-study_finish</CIcon>;
    }
};

const TasksList = ({ tasks, isLimitTasks }) => {
    if (!tasks || !tasks.length) return <div className="notask">暂无作业</div>;
    const getHref = task => {
        switch (task.type) {
            case Task_Type.Video:
            case Task_Type.Quiz_PDF:
                return `/learn/course/${task.course_id}?task_id=${
                    task.id
                }&lesson_id=${task.lesson_id}`;
            case Task_Type.Quiz:
                return `/quiz/kj?task_id=${task.id}`;
            case Task_Type.Quiz_Feedback: {
                return `/quiz/kj?task_id=${task.id}&stats_content_quiz_id=${
                    task.object_id
                }`;
            }
            case Task_Type.Word:
                if (task.word_start_index && task.word_end_index) {
                    return `/lword?task_id=${task.id}&start_index=${
                        task.word_start_index
                    }&end_index=${task.word_end_index}`;
                } else {
                    return `/lword?task_id=${task.id}&word_type=${
                        task.object_id
                    }`;
                }
        }
    };
    return tasks.map((task, i) => {
        if (isLimitTasks && i >= 5) return null;

        return (
            <Column112 key={task.id} className="task-item" href={getHref(task)}>
                <Label type={task.type} />
                <TextFix className="task-title">{task.title}</TextFix>
                <Status task={task} />
            </Column112>
        );
    });
};

export default TasksList;

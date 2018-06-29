import React from 'react';
import TextFix from '@/component/TextFix';
import { Task_Type } from '@/constant';
import { Column112 } from '@/component/GGrid';
import GIcon from '@/component/GIcon';

const Label = ({ type }) => {
    const map = {
        '1': '视频',
        '2': '习题',
        '3': '反馈',
        '4': '单词',
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
        return <GIcon name="ci-study_finish" className="task-opration" />;
    }
};

const TasksList = ({ tasks, isLimitTasks }) => {
    if (!tasks || !tasks.length) return <div className="notask">暂无作业</div>;
    const getHref = task => {
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
                    return `/quiz/kj?${map[task.object_type]}=${
                        task.object_id
                    }`;
                } else {
                    return `/quiz/grammar?${map[task.object_type]}=${
                        task.object_id
                    }`;
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

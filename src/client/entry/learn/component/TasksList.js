import React from 'react';
import TextFix from '@/component/TextFix';
import { Task_Type } from '@/constant';
import { Column122 } from '@/component/GGrid';

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
                    '4': 'content_quiz_id',
                    '5': 'stats_content_quiz_id',
                };
                // todo 临时 quiz 路径
                return `/tgrammar/quiz?${map[task.object_type]}=${
                    task.object_id
                }`;
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
            <Column122 key={task.id} className="task-item" href={getHref(task)}>
                <Label type={task.type} />
                <TextFix className="task-title">{task.title}</TextFix>
            </Column122>
        );
    });
};

export default TasksList;

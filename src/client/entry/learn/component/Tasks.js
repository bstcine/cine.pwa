import React from 'react';
import { Grid, Column122 } from '@/component/GGrid';
import GIcon from '@/component/GIcon';
import TextFix from '@/component/TextFix';
import { Task_Type } from '@/constant';

const Label = ({ type }) => {
    const map = {
        '1': '视频',
        '2': '习题',
        '3': '习题反馈',
        '4': '单词',
        '9': '其他',
    };
    return <span className="label">{map[type]}</span>;
};

const Badge = ({ tasks }) => {
    if (!tasks || !tasks.length) return null;

    return <span className="badge">{tasks.length}</span>;
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
                return `/learn/quiz?${map[task.object_type]}=${task.object_id}`;
            }
            case Task_Type.Word:
                if (task.word_start_index && task.word_end_index) {
                    return `/learn/word?word_start_index=${
                        task.word_start_index
                    }&word_end_index=${task.word_end_index}`;
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

const ExpandMore = ({ tasks, isLimitTasks, onShowAllTask }) => {
    if (tasks && tasks.length > 5) {
        return (
            <span className="expand_more" onClick={onShowAllTask}>
                展开更多作业 <GIcon name="expand_more" />
            </span>
        );
    } else {
        return null;
    }
};

const Tasks = ({ tasks, isLimitTasks, onShowAllTask }) => {
    return (
        <div className="tasks-container">
            <nav className="task-nav">
                <a href="/learn/task">以前作业</a>
                <a className="active" href="">
                    本周作业
                    <Badge tasks={tasks} />
                </a>
            </nav>
            <Grid className="task-list">
                <TasksList tasks={tasks} isLimitTasks={isLimitTasks} />
                <ExpandMore
                    tasks={tasks}
                    isLimitTasks={isLimitTasks}
                    onShowAllTask={onShowAllTask}
                />
            </Grid>
        </div>
    );
};

export default Tasks;

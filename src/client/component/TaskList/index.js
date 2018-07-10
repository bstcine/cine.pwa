import React from 'react';
import { Grid } from '@/component/GGrid';
import TaskItem from './TaskItem';


const TaskList = ({ tasks, isMentor }) => {
    let taskList = tasks.map((task, i) => {
        return <TaskItem key={task.id} task={task} isMentor={isMentor} />;
    });
    return <Grid className="task-list">{taskList}</Grid>;
};

export default TaskList;

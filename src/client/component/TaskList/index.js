import React from 'react';
import { CCardContainer } from '@/component/_base';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, isMentor }) => {
    let taskList = tasks.map((task, i) => {
        return <TaskItem key={task.id} task={task} isMentor={isMentor} />;
    });
    return (
        <CCardContainer className="task-list-complex">
            {taskList}
        </CCardContainer>
    );
};

export default TaskList;

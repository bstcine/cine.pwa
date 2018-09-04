import React from 'react';
import { CCardContainer } from '@/component/_base';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, isMentor, gActions }) => {
    let taskList = tasks.map((task, i) => {
        return (
            <TaskItem
                key={task.id}
                task={task}
                isMentor={isMentor}
                gActions={gActions}
            />
        );
    });
    return (
        <CCardContainer className="task-list-complex" gap="none">
            {taskList}
        </CCardContainer>
    );
};

export default TaskList;

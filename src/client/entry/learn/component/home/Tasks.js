import React from 'react';
import TasksList from './TasksList';
import { CCardContainer, CPanel, CIcon } from '@/component/_base';

const ExpandMore = ({ tasks, isLimitTasks, onShowAllTask }) => {
    if (tasks && tasks.length > 5 && isLimitTasks) {
        return (
            <span className="expand_more" onClick={onShowAllTask}>
                展开更多作业 <CIcon>mi-expand_more</CIcon>
            </span>
        );
    } else {
        return null;
    }
};

const Tasks = ({ tasks, isLimitTasks, onShowAllTask, gActions }) => {
    return (
        <CPanel
            className="tasks-container"
            title="本周作业"
            badge={tasks.filter(i => i.status !== '2').length}
            ext_title="历史作业"
            ext_href="/learn/task">
            <CCardContainer className="task-list" gap="none">
                <TasksList
                    tasks={tasks}
                    isLimitTasks={isLimitTasks}
                    gActions={gActions}
                />
                <ExpandMore
                    tasks={tasks}
                    isLimitTasks={isLimitTasks}
                    onShowAllTask={onShowAllTask}
                />
            </CCardContainer>
        </CPanel>
    );
};

export default Tasks;

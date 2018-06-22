import React from 'react';
import { Grid, Column122 } from '@/component/GGrid';
import GIcon from '@/component/GIcon';
import { Task_Type } from '@/constant';
import TasksList from './TasksList';

const Badge = ({ tasks }) => {
    if (!tasks || !tasks.length) return null;

    return <span className="badge">{tasks.length}</span>;
};

const ExpandMore = ({ tasks, isLimitTasks, onShowAllTask }) => {
    if (tasks && tasks.length > 5 && isLimitTasks) {
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

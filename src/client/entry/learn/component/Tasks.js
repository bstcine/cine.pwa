import React from 'react';
import { Grid } from '@/component/CGrid';
import GIcon from '@/component/GIcon';
import TasksList from './TasksList';
import { CPanel } from '@/component/_base';

const ExpandMore = ({ tasks, isLimitTasks, onShowAllTask }) => {
    if (tasks && tasks.length > 5 && isLimitTasks) {
        return (
            <span className="expand_more" onClick={onShowAllTask}>
                展开更多作业 <GIcon name="mi-expand_more" />
            </span>
        );
    } else {
        return null;
    }
};

const Tasks = ({ tasks, isLimitTasks, onShowAllTask }) => {
    return (
        <CPanel
            title="本周作业"
            badge={tasks.filter(i => i.status !== '2').length}
            ext_title="历史作业"
            ext_href="/learn/task">
            <Grid className="task-list">
                <TasksList tasks={tasks} isLimitTasks={isLimitTasks} />
                <ExpandMore
                    tasks={tasks}
                    isLimitTasks={isLimitTasks}
                    onShowAllTask={onShowAllTask}
                />
            </Grid>
        </CPanel>
    );
};

export default Tasks;

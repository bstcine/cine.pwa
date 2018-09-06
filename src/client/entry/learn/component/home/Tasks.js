import React from 'react';
import TasksList from './TasksList';
import { CCardContainer, CPanel, CIcon, CModal } from '@/component/_base';
import siteCodeUtil from '@/util/sitecodeUtil';
import uaUtil from '@/util/uaUtil';

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

const Tasks = ({ tasks, user, isLimitTasks, onShowAllTask, gActions }) => {
    return (
        <div className="cine-panel tasks-container">
            <div className="cine-panel__head">
                <div className="cine-panel__lefthead">
                    <div className="cine-panel__title">
                        本周作业<span className="cine-panel__badge">
                            {tasks.filter(i => i.status !== '2').length}
                        </span>
                    </div>
                    <a href="/learn/task">历史作业</a>
                </div>
                <div className="cine-panel__righthead">
                    {uaUtil.PC() ? (
                        <a
                            onClick={() => {
                                CModal.qrcode(
                                    `/learn/achieve?user_id=${user.id}`
                                );
                            }}>
                            打卡 <CIcon>ci-cup</CIcon>
                        </a>
                    ) : (
                        <a href={`/learn/achieve?user_id=${user.id}`}>
                            打卡 <CIcon>ci-cup</CIcon>
                        </a>
                    )}
                </div>
            </div>
            <div className="cine-panel__body">
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
            </div>
        </div>
    );
};

export default Tasks;

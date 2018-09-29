import React from 'react';
import TasksList from './TasksList';
import { CCardContainer, CIcon } from '@/component/_base';
import uaUtil from '@/util/uaUtil';
import QRCode from '@/component/QRCode';
import Bridge from '@/util/bridge';
import siteCodeUtil from '@/util/sitecodeUtil';
import BRIDGE_EVENT from '@/constant/bridgeEvent';

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
                    <a href="/learn/task">全部作业</a>
                </div>
                <div className="cine-panel__righthead">
                    {uaUtil.PC() || uaUtil.AndroidTablet() || uaUtil.iPad() ? (
                        <a
                            onClick={() => {
                                const url = `${location.protocol}//${
                                    location.host
                                }/learn/achieve?user_id=${user.id}`;
                                if (siteCodeUtil.inIOSAPP()) {
                                    Bridge.ios(BRIDGE_EVENT.OPEN_BROWSER, {
                                        visible: false,
                                        url,
                                    });
                                } else {
                                    QRCode.open(url);
                                }
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

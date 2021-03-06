import React from 'react';
import TasksList from './TasksList';
import { CCardContainer, CIcon } from '@/component/_base';
import uaUtil from '@/util/_base/uaUtil';
import QRCode from '@/component/QRCode';
import Bridge from '@/util/_base/interBridge';
import interSiteCodeUtil from '@/util/_base/interSiteCodeUtil';
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

const onClickAllTask = () => {
    let href = '/learn/task';
    if (interSiteCodeUtil.inAndroidAPP()) {
        Bridge.android(BRIDGE_EVENT.OPEN_BROWSER, {
            url: href,
            title: '全部作业',
        }).then(res => {
            console.log(res);
        });
    } else {
        location.href = href;
    }
};

const Tasks = ({ tasks, user, isLimitTasks, onShowAllTask, gActions }) => {
    const badge = tasks
        .filter(i => i.type !== '6' && i.type !== '8')
        .filter(i => i.status !== '2').length;
    return (
        <div className="cine-panel tasks-container">
            <div className="cine-panel__head">
                <div className="cine-panel__lefthead">
                    <div className="cine-panel__title">
                        本周作业
                        {badge > 0 && (
                            <span className="cine-panel__badge">{badge}</span>
                        )}
                    </div>
                    <a onClick={() => onClickAllTask()}>全部作业</a>
                </div>
                <div className="cine-panel__righthead">
                    {uaUtil.PC() || uaUtil.AndroidTablet() || uaUtil.iPad() ? (
                        <a
                            onClick={() => {
                                const url = `${location.protocol}//${location.host}/learn/achieve?user_id=${user.id}`;
                                if (interSiteCodeUtil.inIOSAPP()) {
                                    Bridge.ios(BRIDGE_EVENT.OPEN_BROWSER, {
                                        visible: false,
                                        url,
                                    });
                                } else {
                                    QRCode.open(url);
                                }
                            }}
                        >
                            打卡 <CIcon>ci-cup</CIcon>
                        </a>
                    ) : (
                        <a
                            onClick={() => {
                                if (interSiteCodeUtil.inAndroidAPP()) {
                                    Bridge.android(BRIDGE_EVENT.OPEN_BROWSER, {
                                        url: `/learn/achieve?user_id=${user.id}`,
                                        title: '打卡',
                                        visible: false,
                                    }).then(res => {
                                        console.log(res);
                                    });
                                } else {
                                    location.href = `/learn/achieve?user_id=${user.id}`;
                                }
                            }}
                        >
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

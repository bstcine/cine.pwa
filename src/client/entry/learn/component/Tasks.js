import React from 'react';
import { Grid, Column122 } from '@/component/GGrid';
import GIcon from '@/component/GIcon';
import TextFix from '@/component/TextFix';

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
const Tasks = ({ tasks, isLimitTasks, onShowAllTask }) => {
    // const tasks = [
    //     { id: '1', title: 'Longman3000基础词汇', type: '4' },
    //     { id: '2', title: '《神奇树屋1-恐龙谷历险记》第4课', type: '1' },
    //     { id: '3', title: '《动物农庄》第3课习题', type: '2' },
    //     { id: '4', title: '《动物农庄》第3课习题', type: '2' },
    //     { id: '5', title: '《动物农庄》第3课习题', type: '2' },
    //     { id: '6', title: '《动物农庄》第3课习题', type: '2' },
    //     { id: '7', title: '《动物农庄》第3课习题', type: '2' },
    //     { id: '8', title: '《动物农庄》第3课习题', type: '2' },
    // ];
    return (
        <div className="tasks-container">
            <nav className="task-nav">
                <a href="/learn/task">
                    以前作业
                    {/* <span className="badge">1</span> */}
                </a>
                <a className="active" href="">
                    本周作业
                    {tasks &&
                        !!tasks.length && (
                        <span className="badge">{tasks.length}</span>
                    )}
                </a>
            </nav>
            <Grid className="task-list">
                {!!tasks &&
                    !!tasks.length &&
                    tasks.map((task, i) => {
                        if (isLimitTasks && i >= 5) return null;
                        return (
                            <Column122
                                key={task.id}
                                className="task-item"
                                href="/learn/task/">
                                <Label type={task.type} />
                                <TextFix className="task-title">
                                    {task.title}
                                </TextFix>
                            </Column122>
                        );
                    })}
                {isLimitTasks && (
                    <span className="expand_more" onClick={onShowAllTask}>
                        展开更多作业 <GIcon name="expand_more" />
                    </span>
                )}
            </Grid>
        </div>
    );
};

export default Tasks;

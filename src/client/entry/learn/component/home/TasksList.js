import React from 'react';
import TextFix from '@/component/TextFix';
import { Task_Type } from '@/constant';
import { CCard, CIcon, CModal } from '@/component/_base';
import task from '@/constant/task';
import siteCodeUtil from '@/util/sitecodeUtil';
import BRIDGE_EVENT from '@/constant/bridgeEvent';
import Bridge from '@/util/bridge';

const Label = ({ type }) => <span className="label">{task[type]}</span>;

const Status = ({ task }) => {
    if (task.type === Task_Type.Offline || task.type === Task_Type.Writing)
        return null;
    if (task.status === '0' || task.status === '1') {
        return task.type === '3' ? (
            <span className="task-opration">查看</span>
        ) : (
            <span className="task-opration">待完成</span>
        );
    } else {
        return <CIcon className="task-opration">ci-green_corret</CIcon>;
    }
};

const getHref = task => {
    switch (task.type) {
        case Task_Type.Video:
        case Task_Type.Quiz_PDF:
            return `/learn/course/${task.course_id}?task_id=${
                task.id
            }&lesson_id=${task.lesson_id}`;
        case Task_Type.Quiz:
            return `/quiz/kj?task_id=${task.id}`;
        case Task_Type.Quiz_Feedback: {
            return `/quiz/kj?task_id=${task.id}&stats_content_quiz_id=${
                task.object_id
            }`;
        }
        case Task_Type.Word:
            if (task.word_start_index && task.word_end_index) {
                return `/lword?task_id=${task.id}&start_index=${
                    task.word_start_index
                }&end_index=${task.word_end_index}`;
            } else {
                return `/lword?task_id=${task.id}&word_type=${task.object_id}`;
            }
    }
};

const onClick = task => {
    if (task.type === Task_Type.Offline) {
        CModal.alert({
            title: task.title,
            text: task.writing_desc,
            responsive: true,
        });
        return;
    }

    if (task.type === Task_Type.Writing && task.writing_desc) {
        CModal.alert({
            title: task.title,
            text: task.writing_desc,
            responsive: true,
        });
        return;
    }

    let tempHref = getHref(task);
    if (tempHref) {
        if (siteCodeUtil.inAPP()) {
            if (task.type === Task_Type.Video) {
                Bridge.common(BRIDGE_EVENT.PLAY, {
                    course_id: task.course_id,
                    lesson_id: task.object_id,
                }).then(res => {
                    console.log(res);
                });
            } else if (task.type === Task_Type.Quiz_PDF) {
                alert('请登入官网下载对应的习题PDF');
            } else {
                Bridge.common(BRIDGE_EVENT.OPEN_BROWSER, {
                    url: tempHref,
                    title: task.title,
                }).then(res => {
                    console.log(res);
                });
            }
        } else {
            location.href = tempHref;
            // console.log(task);
        }
    }
};

const TasksList = ({ tasks, isLimitTasks }) => {
    if (!tasks || !tasks.length) return <div className="notask">暂无作业</div>;
    return tasks.map((task, i) => {
        if (isLimitTasks && i >= 5) return null;

        return (
            <CCard
                key={task.id}
                hover="lighten"
                className="task-item"
                onClick={() => onClick(task)}
            >
                <Label type={task.type} />
                <TextFix className="task-title">{task.title}</TextFix>
                <Status task={task} />
            </CCard>
        );
    });
};

export default TasksList;

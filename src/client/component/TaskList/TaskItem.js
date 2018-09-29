import React from 'react';
import TextFix from '@/component/TextFix';
import { Task_Type } from '@/constant';
import { CCard, CIcon, CModal } from '@/component/_base';
import './style.less';
import task from '@/constant/task';

const Label = ({ type }) => <span className="label">{task[type]}</span>;

const Status = ({ task }) => {
    if (task.type === Task_Type.Offline || task.type === Task_Type.Writing) return null;
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

const getHref = (task, isMentor) => {
    let urlMentorUser = isMentor ? `&user_id=${task.user_id}&cmd=check` : '';
    switch (task.type) {
        case Task_Type.Video:
        case Task_Type.Quiz_PDF:
            return `/learn/course/${task.course_id}?task_id=${
                task.id
            }&lesson_id=${task.lesson_id}`;
        case Task_Type.Quiz:
            return `/quiz/kj?task_id=${task.id}${urlMentorUser}`;
        case Task_Type.Quiz_Feedback: {
            return `/quiz/kj?task_id=${
                task.id
            }${urlMentorUser}&stats_content_quiz_id=${task.object_id}`;
        }
        case Task_Type.Word:
            if (task.word_start_index && task.word_end_index) {
                return `/lword?task_id=${task.id}&start_index=${
                    task.word_start_index
                }&end_index=${task.word_end_index}${urlMentorUser}`;
            } else {
                return `/lword?task_id=${task.id}&word_type=${task.object_id}`;
            }
    }
};
const onClick = task => {
    if (task.type === Task_Type.Offline) {
        return () => {
            CModal.alert({
                title: task.title,
                text: task.writing_desc,
                reposive: true,
            });
        };
    }
};
const TaskItem = ({ task, isMentor }) => {
    return (
        <CCard
            key={task.id}
            hover="lighten"
            className="task-item"
            href={getHref(task, isMentor)}
            onClick={onClick(task)}>
            <Label type={task.type} />
            <TextFix className="task-title">{task.title}</TextFix>
            <Status task={task} />
        </CCard>
    );
};

export default TaskItem;

/**
 * Created by lidangkun on 2018/6/15.
 */
import React from 'react';
import moment from 'moment';
import "../../asset/style/historyTask.less";
import { Grid } from '@/component/GGrid';
import TasksList from '../TasksList';
import SearchTaskDialog from './SearchTaskDialog';

class HistoryTask extends React.PureComponent {

    render() {

        const { isDialogShow, taskModels, startTime, endTime, defaultType, actions } = this.props;

        const button = (
            <button
                className="HT_SearchButton"
                onClick={() => { actions.dialogShow(true) }}
            >
                筛选
            </button>
        );

        const taskList = (
            <TaskListComponent
                taskModels={taskModels}/>
        );

        return (
            <div className="historyTask">
                {taskList}
                {button}
                <SearchTaskDialog
                    key="selectDialog"
                    isOpen={isDialogShow}
                    startTime={startTime}
                    endTime={endTime}
                    defaultType={defaultType}
                    actions={actions}
                />
            </div>
        );
    }
}

export default HistoryTask;

const TaskComponent = ({ taskModel }) => {
    let currentWeek = moment().format('GGGGWW');
    // 重写week
    let week = taskModel.week;
    if (week === currentWeek) {
        week = '本周';
    } else {
        let year = week.substring(0, 4);
        let realWeek = week.substring(4, 6);
        week = year + '第' + realWeek + '周';
    }
    return (
        <div>
            <div className="HT_TaskHeaderTitle">{week}</div>
            <Grid className="task-list">
                <TasksList tasks={taskModel.taskList}/>
            </Grid>
        </div>
    );
}

class TaskListComponent extends React.PureComponent {
    render() {
        const taskModels = this.props.taskModels;
        const children = taskModels.map((item) => {
            return (
                <TaskComponent key={item.week} taskModel={item} />
            );
        })
        return (
            <div className="taskList">
                {children}
            </div>
        );
    }
}
/**
 * Created by lidangkun on 2018/6/15.
 */
import React from 'react';
import "../../asset/style/historyTask.less"
import { Grid } from '@/component/GGrid';
import TasksList from '../TasksList';
import SearchTaskDialog from './SearchTaskDialog';
import { CFlatButton, CDialog, CTextField } from '@/component';

class HistoryTask extends React.PureComponent {

    render() {

        const {isDialogShow,taskModels,selectedValue,selectTitles,actions} = this.props;

        const button = (
            <button
                className="HT_SearchButton"
                onClick={() => {actions.dialogShow(true)}}
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
                    isOpen={isDialogShow}
                    actions={actions}
                />
            </div>
        );
    }
}

export default HistoryTask;

const TaskComponent = ({taskModel}) => {

    return (
        <div>
            <div className="HT_TaskHeaderTitle">{taskModel.week}</div>
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
            return <TaskComponent key={item.week} taskModel={item} />
        })

        return (
            <div className="taskList">
                {children}
            </div>
        );
    }
}
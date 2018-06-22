/**
 * Created by lidangkun on 2018/6/15.
 */
import React from 'react';
import "../../asset/style/historyTask.less"
import { Grid } from '@/component/GGrid';
import TasksList from '../TasksList';

class HistoryTask extends React.PureComponent {

    render() {

        const {isVerb,taskModels,selectedValue,selectTitles,actions} = this.props;

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

        // const dialogList = (
        //     <ListDialog
        //         selectedValue={selectedValue}
        //         list={selectTitles}
        //         open={isVerb}
        //         onClose={() => {actions.dialogShow(false)}}
        //     />
        // );

        return (
            <div className="historyTask">
                {taskList}
                {button}
            </div>
        );
    }
}

export default HistoryTask;

const TaskComponent = ({taskModel}) => {
    // const children = taskModel.content.map(item => {
    //     return <TaskContentComponent content={item} />
    // });

    var arr = [
        {id:'11',title:'动物农dd庄123123',type:'1'},
        {id:'151',title:'动物dd农庄123123',type:'2'},
        {id:'141',title:'动物农庄123123',type:'3'},
        {id:'131',title:'动物aa农庄123123',type:'1'},
        {id:'112',title:'动dd物农庄123123',type:'1'},

    ]

    return (
        <div>
            <div className="HT_TaskHeaderTitle">{taskModel.title}</div>
            <Grid className="task-list">
                <TasksList tasks={arr}/>
            </Grid>
        </div>
    );
}

class TaskListComponent extends React.PureComponent {
    render() {
        const taskModels = this.props.taskModels;
        // alert("刷新列表");
        const children = taskModels.map((item,i) => {
            return <TaskComponent key={i} taskModel={item} />
        })

        return (
            <div className="taskList">
                {children}
            </div>
        );
    }
}
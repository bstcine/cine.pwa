/**
 * Created by lidangkun on 2018/6/15.
 */
import React from 'react';
import "../../asset/style/historyTask.less"

class HistoryTask extends React.PureComponent {

    render() {

        const {isVerb,taskModels,selectedValue,selectTitles,actions} = this.props;

        const button = (
            <button
                className="searchButton"
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
            <div className="task">
                {taskList}
                {button}
            </div>
        );
    }
}

export default HistoryTask;

const TaskContentComponent = ({content}) => {
    return (
        <div className="taskContent">
            <p className="taskContentType">{content.type}</p>
            <p className="taskContentText">{content.text}</p>
            <a className="taskContentInspect">查看</a>
        </div>
    );
}

const TaskComponent = ({taskModel}) => {
    const children = taskModel.content.map(item => {
        return <TaskContentComponent content={item} />
    });

    return (
        <div>
            <div className="taskContentHeader">
                <p className="taskHeaderTitle">{taskModel.title}</p>
            </div>
            {children}
        </div>
    );
}

class TaskListComponent extends React.PureComponent {
    render() {
        const taskModels = this.props.taskModels;
        alert("刷新列表");
        const children = taskModels.map(item => {
            return <TaskComponent taskModel={item} />
        })

        return (
            <div className="taskList">
                {children}
            </div>
        );
    }
}
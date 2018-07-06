import React from 'react';
import moment from 'moment';
import '../../asset/style/historyTask.less';
import { Grid } from '@/component/GGrid';
import TasksList from '../TasksList';

const TaskSection = ({ taskModel }) => {
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
                <TasksList tasks={taskModel.taskList} />
            </Grid>
        </div>
    );
};

class HistoryTaskList extends React.PureComponent {
    render() {
        const taskModels = this.props.taskModels;
        const children = taskModels.map(item => {
            return <TaskSection key={item.week} taskModel={item} />;
        });
        return <div className="taskList">{children}</div>;
    }
}

export default HistoryTaskList;

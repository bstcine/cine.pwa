import React from 'react';
import moment from 'moment';
import TaskList from '@/component/TaskList';
import '../../asset/style/historyTask.less';

const TaskWeek = ({ value }) => {
    let currentWeek = moment().format('GGGGWW');
    // 重写week
    let week = value;
    if (week === currentWeek) {
        week = '本周';
    } else {
        let year = week.substring(0, 4);
        let realWeek = week.substring(4, 6);
        week = year + '第' + realWeek + '周';
    }
    return <div className="HT_TaskHeaderTitle">{week}</div>;
};

class HistoryTaskList extends React.PureComponent {
    render() {
        const taskModels = this.props.taskModels;

        const children = taskModels.map((model, i) => {
            return (
                <div key={i}>
                    <TaskWeek value={model.week} />
                    <TaskList tasks={model.taskList} />
                </div>
            );
        });
        return <div className="historyTask">{children}</div>;
    }
}

export default HistoryTaskList;

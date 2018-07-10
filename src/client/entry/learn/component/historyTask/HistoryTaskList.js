import React from 'react';
import moment from 'moment';
import GPanel from '@/component/GPanel';
import TaskList from '@/component/TaskList';
import '../../asset/style/historyTask.less';

const TaskWeek = ({ value }) => {
    let currentWeek = moment().format('GGGGWW');
    // 重写week
    let week = value;
    let className = 'HT_HeaderTitle';
    if (week === currentWeek) {
        week = '本周';
        className = 'HT_FirstHeaderTitle';
    } else {
        let year = week.substring(0, 4);
        let realWeek = week.substring(4, 6);
        week = year + '第' + realWeek + '周';
    }
    return (
        <div className="historyTask">
            <div className={className}>{week}</div>
        </div>
    );
};

class HistoryTaskList extends React.PureComponent {
    render() {
        const { taskModels, isMentor } = this.props;
        const children = taskModels.map((model, i) => {
            return (
                <div key={i}>
                    <TaskWeek value={model.week} />
                    <TaskList tasks={model.taskList} isMentor={isMentor} />
                </div>
            );
        });

        return <GPanel>{children}</GPanel>;
    }
}

export default HistoryTaskList;

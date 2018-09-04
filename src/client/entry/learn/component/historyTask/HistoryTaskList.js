import React from 'react';
import moment from 'moment';
import TaskList from '@/component/TaskList';
import '../../asset/style/historyTask.less';

const TaskWeek = ({ value, seq }) => {
    let currentWeek = moment().format('GGGGWW');
    // 重写week
    let week = value;
    let className = seq === 0 ? 'HT_FirstHeaderTitle' : 'HT_HeaderTitle';
    if (week === currentWeek) {
        week = '本周';
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
        const { taskModels, isMentor, gActions } = this.props;
        const children = taskModels.map((model, i) => {
            return (
                <div key={i}>
                    <TaskWeek value={model.week} seq={i} />
                    <TaskList
                        tasks={model.taskList}
                        isMentor={isMentor}
                        gActions={gActions}
                    />
                </div>
            );
        });

        return <React.Fragment>{children} </React.Fragment>;
    }
}

export default HistoryTaskList;

/**
 * Created by lidangkun on 2018/6/15.
 */
import React from 'react';
import '../../asset/style/historyTask.less';
import HistoryTaskList from './HistoryTaskList';
import FilterTaskDialog from './FilterTaskDialog';
import { CFloatingButton } from '@/component/_base';

class HistoryTask extends React.PureComponent {
    handleFilter = () => {
        this.props.actions.dialogShow(true);
    };

    render() {
        const {
            isDialogShow,
            taskModels,
            startTime,
            endTime,
            defaultType,
            actions,
        } = this.props;

        return (
            <div className="historyTask">
                <HistoryTaskList taskModels={taskModels} />

                <CFloatingButton
                    iconName="search"
                    color="primary"
                    onClick={this.handleFilter}
                />

                <FilterTaskDialog
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

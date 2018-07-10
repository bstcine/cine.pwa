/**
 * Created by lidangkun on 2018/6/15.
 */
import React from 'react';
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
        const isMentor = false;
        return (
            <React.Fragment>
                <HistoryTaskList taskModels={taskModels} isMentor={isMentor}/>

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
            </React.Fragment>
        );
    }
}

export default HistoryTask;

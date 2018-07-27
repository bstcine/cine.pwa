/**
 * Created by lidangkun on 2018/6/15.
 */
import React from 'react';
import HistoryTaskList from './HistoryTaskList';
import FilterTaskDialog from './FilterTaskDialog';
import { CFloatingBox, CButton } from '@/component/_base';
import { GIcon } from '@/g/component';

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
            user,
            param,
            actions,
        } = this.props;
        let isMentor = false;
        if (
            user &&
            user.role_id &&
            (user.role_id === '1' || user.role_id === '2')
        ) {
            isMentor = true;
        }
        return (
            <React.Fragment>
                <HistoryTaskList taskModels={taskModels} isMentor={isMentor} />

                <CFloatingBox>
                    <CButton
                        variant="fab"
                        color="primary"
                        onClick={this.handleFilter}>
                        <GIcon name="mi-search" />
                    </CButton>
                </CFloatingBox>

                <FilterTaskDialog
                    key="selectDialog"
                    isOpen={isDialogShow}
                    startTime={startTime}
                    endTime={endTime}
                    defaultType={defaultType}
                    param={param}
                    actions={actions}
                />
            </React.Fragment>
        );
    }
}

export default HistoryTask;

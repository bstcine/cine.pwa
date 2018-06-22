/**
 * Created by lidangkun on 2018/6/15.
 */
import GLayout from '@/component/GLayout';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toast } from '@/component/Toast';
import { actionHistoryTask } from '@/action/lHistoryTaskAction';
import HistoryTask from '../component/historyTask'

class HistoryTaskContainer extends React.PureComponent {

    componentDidMount() {
        let {actions} = this.props;
        actions.loadHistoryTask();
    }

    render(){

        const {isVerb,taskModels,selectedValue,selectTitles,actions} = this.props;

        // alert(taskModels.length);

        return (
            <GLayout>
                <HistoryTask
                isVerb={isVerb}
                taskModels={taskModels}
                selectedValue={selectedValue}
                selectTitles={selectTitles}
                actions={actions}
            />
            </GLayout>
        );
    }

}

const mapStateToProps = state => {
    return {
        selectType: state.historyTaskRedu.get('selectType'),
        isVerb:state.historyTaskRedu.get('isVerb'),
        taskModels:state.historyTaskRedu.get('taskModels'),
        selectedValue:state.historyTaskRedu.get('selectedValue'),
        selectTitles:state.historyTaskRedu.get('selectTitles'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionHistoryTask, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
    HistoryTaskContainer
);
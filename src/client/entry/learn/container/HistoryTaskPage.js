/**
 * Created by lidangkun on 2018/6/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { lTaskAction } from '@/action/lTaskAction';
import HistoryTask from '../component/historyTask';
import CThemeProvider from '@/component/CThemeProvider';
import { getParam } from '@/util/urlUtil';
import { withRouter } from 'react-router-dom';
import { GLayoutContainer } from '@/g/container';
import gAction from '@/g/action';

class HistoryTaskPage extends React.Component {
    constructor(props) {
        super(props);

        this.audioPlayer = new Audio();
        // 获取参数
        this.param = getParam();
        document.title = '全部作业';
    }
    componentDidMount() {
        let { actions } = this.props;
        actions.loadHistoryTask(this.param);
    }

    render() {
        const {
            isDialogShow,
            taskModels,
            startTime,
            endTime,
            defaultType,
            user,
            actions,
            gActions,
        } = this.props;
        return (
            <CThemeProvider>
                <GLayoutContainer>
                    <HistoryTask
                        isDialogShow={isDialogShow}
                        taskModels={taskModels}
                        startTime={startTime}
                        endTime={endTime}
                        defaultType={defaultType}
                        user={user}
                        param={this.param}
                        actions={actions}
                        gActions={gActions}
                    />
                </GLayoutContainer>
            </CThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectType: state.TaskRedu.get('selectType'),
        isDialogShow: state.TaskRedu.get('isDialogShow'),
        taskModels: state.TaskRedu.get('taskModels'),
        startTime: state.TaskRedu.get('startTime'),
        endTime: state.TaskRedu.get('endTime'),
        defaultType: state.TaskRedu.get('defaultType'),
        user: state.userRedu.data,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(lTaskAction, dispatch),
    gActions: bindActionCreators(gAction, dispatch),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(HistoryTaskPage)
);

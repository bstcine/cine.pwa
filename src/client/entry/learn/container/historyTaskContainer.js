/**
 * Created by lidangkun on 2018/6/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionHistoryTask } from '@/action/lHistoryTaskAction';
import HistoryTask from '../component/historyTask';
import CThemeProvider from '@/component/CThemeProvider';
import { getParam } from '@/util/urlUtil';

class HistoryTaskContainer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.audioPlayer = new Audio();
        // 获取参数
        let param = getParam();

        let type = param.type;
        this.param = {
            type: type,
        };
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
            actions,
        } = this.props;

        return (
            <CThemeProvider>
                <div>
                    <HistoryTask
                        isDialogShow={isDialogShow}
                        taskModels={taskModels}
                        startTime={startTime}
                        endTime={endTime}
                        defaultType={defaultType}
                        actions={actions}
                    />
                </div>
            </CThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectType: state.historyTaskRedu.get('selectType'),
        isDialogShow: state.historyTaskRedu.get('isDialogShow'),
        taskModels: state.historyTaskRedu.get('taskModels'),
        startTime: state.historyTaskRedu.get('startTime'),
        endTime: state.historyTaskRedu.get('endTime'),
        defaultType: state.historyTaskRedu.get('defaultType'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionHistoryTask, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    HistoryTaskContainer
);

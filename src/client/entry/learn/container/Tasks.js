import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Tasks from '../component/home/Tasks';
import uaUtil from '@/util/uaUtil';
import { fetchCurrentTask } from '@/action/learnAction';
import gAction from '@/g/action';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => {
    const { currentTasks } = state;
    return { currentTasks };
};

const mapDispatchToProps = dispatch => ({
    fetchCurrentTask: () => {
        dispatch(fetchCurrentTask());
    },
    gActions: bindActionCreators(gAction, dispatch),
});

class TaskContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.onShowAllTask = this.onShowAllTask.bind(this);
        this.state = {
            isLimitTasks: !!uaUtil.phone(),
        };
    }

    componentDidMount() {
        this.props.fetchCurrentTask();
    }

    onShowAllTask() {
        this.setState({
            isLimitTasks: false,
        });
    }

    render() {
        const { currentTasks, gActions } = this.props;
        const { isLimitTasks } = this.state;
        return (
            <Tasks
                tasks={currentTasks}
                isLimitTasks={isLimitTasks}
                onShowAllTask={this.onShowAllTask}
                gActions={gActions}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);

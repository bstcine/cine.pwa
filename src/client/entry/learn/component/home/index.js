import React from 'react';
import Tasks from './Tasks';
import Courses from './Courses';
import uaUtil from '@/util/uaUtil';

class HomeIndex extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onShowAllTask = this.onShowAllTask.bind(this);
        this.state = {
            isLimitTasks: !!uaUtil.phone(),
        };
    }

    onShowAllTask() {
        this.setState({
            isLimitTasks: false,
        });
    }

    render() {
        const { isVip, tasks, courses } = this.props;
        return (
            <React.Fragment>
                {isVip ? (
                    <Tasks
                        tasks={tasks}
                        isLimitTasks={this.state.isLimitTasks}
                        onShowAllTask={this.onShowAllTask}
                    />
                ) : (
                    ''
                )}
                <Courses courses={courses} />
            </React.Fragment>
        );
    }
}

export default HomeIndex;

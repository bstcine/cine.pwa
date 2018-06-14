import React, { Component } from 'react';

class TasksContainer extends Component {
    render() {
        return (
            <div className="tasks-container">
                <nav className="task-nav">
                    <a href="/learn/task">
                        以前作业
                        <span className="badge">1</span>
                    </a>
                    <a className="active" href="">
                        本周作业
                        <span className="badge">3</span>
                    </a>
                </nav>
                <div className="task-list">
                    <div className="col-1-2-2">1</div>
                    <div className="col-1-2-2">2</div>
                    <div className="col-1-2-2">2</div>
                    <div className="col-1-2-2">2</div>
                    <div className="col-1-2-2">2</div>
                    <div className="col-1-2-2">2</div>
                    <div className="col-1-2-2">2</div>
                </div>
            </div>
        );
    }
}

export default TasksContainer;

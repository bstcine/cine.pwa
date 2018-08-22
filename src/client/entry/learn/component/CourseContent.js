import React, { Component } from 'react';
import { CPanel, CIcon } from '@/component/_base';
import { withRouter } from 'react-router';

class CourseContent extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps, 'nextProps');

        return true;
    }

    render() {
        console.log('render CourseContent');

        return (
            <CPanel
                title="《新概念英语2》第2单元精讲（25-48课）"
                className="course__content">
                1231
            </CPanel>
        );
    }
}

export default withRouter(CourseContent);

import React, { Component } from 'react';
import { GLayoutContainer } from '@/g/container';
import CourseContentContainer from './CourseContentContainer';
import CourseNavContainer from './CourseNavContainer';
import '../asset/style/coursePage.less';

class CoursePage extends Component {
    render() {
        return (
            <GLayoutContainer size="large">
                <div className="course__main">
                    <CourseContentContainer />
                    <CourseNavContainer />
                </div>
            </GLayoutContainer>
        );
    }
}

export default CoursePage;

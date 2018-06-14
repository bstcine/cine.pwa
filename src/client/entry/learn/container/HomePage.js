import React from 'react';
import PropTypes from 'prop-types';
import Entry from '@/component/Entry';
import GLayout from '@/component/GLayout';
import TasksContainer from './TasksContainer';
import CoursesContainer from './CoursesContainer';
import '../asset/style/index.less';

class HomePage extends Entry {
    componentDidMount() {
        // const { fetchHomeData } = this.props;
        // fetchHomeData();
    }

    render() {
        return (
            <GLayout>
                <TasksContainer />
                <CoursesContainer />
            </GLayout>
        );
    }
}

HomePage.propTypes = {
    // fetchHomeData: PropTypes.func.isRequired,
};

export default HomePage;

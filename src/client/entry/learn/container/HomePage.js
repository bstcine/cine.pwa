import React from 'react';
import PropTypes from 'prop-types';
import Entry from '@/component/Entry';
import Layout from '@/component/Layout';
import TasksContainer from './TasksContainer';
import CoursesContainer from './CoursesContainer';

class HomePage extends Entry {
    componentDidMount() {
        const { fetchHomeData } = this.props;
        fetchHomeData();
    }

    render() {
        return (
            <Layout>
                <TasksContainer />
                <CoursesContainer />
            </Layout>
        );
    }
}

HomePage.propTypes = {
    fetchHomeData: PropTypes.func.isRequired,
};

export default HomePage;

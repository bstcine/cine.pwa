import React from 'react';
import { connect } from 'react-redux';
import Entry from '@/component/Entry';
import GLayout from '@/component/GLayout';
import Tasks from './Tasks';
import Courses from './Courses';
import '../asset/style/index.less';
import { fetchUserInfo } from '@/action/commonAction';
const mapStateToProps = state => {
    const { user } = state;
    return { user: user.data };
};
const mapDispatchToProps = dispatch => ({
    fetchUserInfo: () => {
        dispatch(fetchUserInfo());
    },
});

class HomePage extends Entry {
    componentDidMount() {
        this.props.fetchUserInfo();
    }

    render() {
        const { user } = this.props;
        return (
            <GLayout>
                {!!user && user.type === '2' && <Tasks />}
                <Courses />
            </GLayout>
        );
    }
}

HomePage.propTypes = {
    // fetchHomeData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

import React from 'react';
import { connect } from 'react-redux';
import Entry from '@/component/Entry';
import Tasks from './Tasks';
import Courses from './Courses';
import { fetchUserInfo } from '@/action/commonAction';
const mapStateToProps = state => {
    const { userRedu } = state;
    return { user: userRedu.data };
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
            <React.Fragment>
                {!!user && user.type === '2' && <Tasks />}
                <Courses />
            </React.Fragment>
        );
    }
}

HomePage.propTypes = {
    // fetchHomeData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

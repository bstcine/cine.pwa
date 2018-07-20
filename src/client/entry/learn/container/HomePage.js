import React from 'react';
import { connect } from 'react-redux';
import Entry from '@/component/Entry';
import Tasks from './Tasks';
import Courses from './Courses';
import '../asset/style/index.less';
import gAction from '@/g/action';
const mapStateToProps = state => {
    const { userRedu } = state;
    return { user: userRedu.data };
};
const mapDispatchToProps = dispatch => ({
    fetchUserInfo: () => {
        dispatch(gAction.fetchUserInfo());
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

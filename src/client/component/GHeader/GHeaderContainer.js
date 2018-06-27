import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GHeader from './GHeader';
import { fetchUserInfo } from '@/action/commonAction';
import { logoutV1 } from '@/service/base';
import { getNav } from '@/util/menuUtil';

const mapStateToProps = state => {
    let { user } = state;
    const { navs1, navs2 } = getNav(user.data);
    return { user: user.data, navs1, navs2 };
};

const mapDispatchToProps = dispatch => ({
    fetchUserInfo: () => {
        dispatch(fetchUserInfo());
    },
});

class GHeaderContainer extends Component {
    static defaultProps = getNav();
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.props.fetchUserInfo();
    }

    logout() {
        logoutV1().then(() => {
            location.href = '/';
        });
    }

    render() {
        const { user, navs1, navs2 } = this.props;
        return (
            <GHeader
                user={user}
                navs1={navs1}
                navs2={navs2}
                onLogout={this.logout}
            />
        );
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(GHeaderContainer)
);

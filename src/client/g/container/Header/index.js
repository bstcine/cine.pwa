import { connect } from 'react-redux';
import Header from '@/g/component/Header';
import gAction from '@/g/action';
import { logoutV1 } from '@/service/base';
import { getNavs } from './helper';
import React, { PureComponent } from 'react';

const mapStateToProps = state => {
    let { userRedu } = state;
    const navs = getNavs(userRedu.data);
    return { user: userRedu.data, navs };
};

const mapDispatchToProps = dispatch => ({
    fetchUserInfo: () => {
        dispatch(gAction.fetchUserInfo());
    },
    onLogout: () => {
        logoutV1().then(() => {
            location.href = '/';
        });
    },
});

class HeaderContainer extends PureComponent {
    componentDidMount() {
        this.props.fetchUserInfo();
    }

    render() {
        const props = this.props;
        return <Header {...props} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);

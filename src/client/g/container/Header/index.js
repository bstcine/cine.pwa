import { connect } from 'react-redux';
import Header from '@/g/component/Header';
import gAction from '@/g/action';
import { logoutV1 } from '@/service/base';
import React, { PureComponent } from 'react';

const mapStateToProps = state => {
    let { userRedu } = state;
    return { user: userRedu.data };
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
        const { user, onLogout } = this.props;
        return <Header user={user} onLogout={onLogout} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../asset/style/index.less';
import { bindActionCreators } from 'redux';
import gAction from '@/g/action';
import UserMobile from '@/entry/user/component/UserMobile';
import { logoutV1 } from '@/service/base';

class Root extends Component {
    constructor(props) {
        super(props);
        this.isUserHome = location.pathname.split('/').join('') === 'user';
        this.isLessUpSm =
            (window.innerWidth > 0 ? window.innerWidth : screen.width) <= 568;
        if (this.isUserHome && !this.isLessUpSm) location.href = '/user/coupon';
        this.onLogout = this.onLogout.bind(this);
    }

    componentDidMount() {
        if (this.isUserHome && this.isLessUpSm) {
            this.props.actions.preFetchUserInfo();
        }
    }

    onLogout() {
        logoutV1().then(() => {
            location.href = '/';
        });
    }

    render() {
        const { user } = this.props;
        if (this.isUserHome && this.isLessUpSm)
            return user && <UserMobile user={user} onLogout={this.onLogout} />;
        return null;
    }
}

const mapStateToProps = state => ({ user: state.userRedu.data });

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(gAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);

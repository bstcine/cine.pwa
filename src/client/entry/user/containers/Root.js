import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../asset/style/index.less';
import { GLayoutContainer } from '@/g/container';
import { bindActionCreators } from 'redux';
import gAction from '@/g/action';
import UserMobile from '@/entry/user/component/UserMobile';

class Root extends Component {
    constructor(props) {
        super(props);
        this.isUserHome = location.pathname.split('/').join('') === 'user';
        this.isLessUpSm =
            (window.innerWidth > 0 ? window.innerWidth : screen.width) <= 568;
        if (this.isUserHome && !this.isLessUpSm)
            location.href = '/user/integral';
    }

    componentDidMount() {
        if (this.isUserHome && this.isLessUpSm) {
            this.props.actions.preFetchUserInfo();
        }
    }

    render() {
        const { routes, user } = this.props;
        if (this.isUserHome && this.isLessUpSm)
            return user && <UserMobile user={user} />;
        return <GLayoutContainer>{routes}</GLayoutContainer>;
    }
}

const mapStateToProps = state => ({ user: state.userRedu.data });

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(gAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);

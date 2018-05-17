import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionUserInfo } from '@/action/userAction';
import { logoutV1 } from '@/service/base';
import UserMobile from '@/entry/user/component/UserMobile';
import UserHeader from '@/entry/user/component/UserHeader';
import '../asset/style/index.less';

class Root extends Component {
    constructor(props) {
        super(props);
        this.selectId = location.pathname
            .replace('/user', '')
            .split('/')
            .join('');

        // 是否小于横屏Pad
        let width = window.innerWidth > 0 ? window.innerWidth : screen.width;
        this.isLessUpSm = width < 1024;

        // 是否用户主页{/user}
        this.isUserHome = location.pathname.split('/').join('') === 'user';
    }

    componentDidMount() {
        // 移动端且不是用户主页时不加载用户信息
        if (this.isLessUpSm && !this.isUserHome) return;
        this.props.actions.loadUserInfo();
    }

    handleClick = id => {
        switch (id) {
            case 'integral':
                this.props.history.replace('/user/integral');
                this.selectId = 'integral';
                break;
            case 'coupon':
                this.props.history.replace('/user/coupon');
                this.selectId = 'coupon';
                break;
            case 'quit':
                logoutV1().then((err, res) => {
                    console.log(110, err, res);
                    location.href = '/';
                });
                break;
        }
    };

    render() {
        const { user, routes } = this.props;

        if (this.isUserHome) {
            if (this.isLessUpSm) {
                return (
                    <UserMobile user={user} handleClick={this.handleClick} />
                );
            } else {
                location.href = '/user/integral';
                return <div />;
            }
        }

        return (
            <React.Fragment>
                <UserHeader
                    selectId={this.selectId}
                    user={user}
                    handleClick={this.handleClick}
                />
                <div className={'user-content'}>{routes}</div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionUserInfo, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);

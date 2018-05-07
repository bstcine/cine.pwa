import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionUserInfo } from '@/action/userAction';
import { logoutV1 } from '@/service/base';
import uaUtil from '@/util/uaUtil';
import UserMobile from '@/entry/user/component/UserMobile';
import UserHeader from '@/entry/user/component/UserHeader';
import { Route } from 'react-router-dom';
import '../asset/style/index.less';

class Root extends Component {
    constructor(props) {
        super(props);
        this.topicId = 'integral';

        // 是否纯用户路由{/user}
        this.isJustUserRoute =
            location.pathname === '/user' || location.pathname === '/user/';
    }

    componentDidMount() {
        // 移动端且不是纯用户路由时不加载用户信息
        if (
            (uaUtil.AndroidMobile() || uaUtil.iPhone()) &&
            !this.isJustUserRoute
        ) return;
        this.props.actions.loadUserInfo();
    }

    handleClick = id => {
        switch (id) {
            case 'study':
                location.href = '/learn';
                break;
            case 'integral':
                this.props.history.replace('/user/integral');
                this.topicId = 'integral';
                break;
            case 'coupon':
                this.props.history.replace('/user/coupon');
                this.topicId = 'coupon';
                break;
            case 'wordtest':
                window.open('/vocabtest');
                break;
            case 'tgrammar':
                window.open('/tgrammar/quiz');
                break;
            case 'tgrammar-teacher':
                window.open('/tgrammar/stats/list');
                break;
            case 'password':
                location.href = '/resetPassword';
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

        if (this.isJustUserRoute) {
            if (uaUtil.AndroidMobile() || uaUtil.iPhone()) {
                return (
                    <UserMobile user={user} handleClick={this.handleClick} />
                );
            } else {
                location.href = '/user/integral';
            }
        }

        return (
            <React.Fragment>
                <UserHeader
                    topicId={this.topicId}
                    user={user}
                    handleClick={this.handleClick}
                />
                <div
                    className={
                        this.isJustUserRoute
                            ? 'user-content just-user'
                            : 'user-content'
                    }>
                    {routes.map((route, i) => (
                        <Route
                            key={i}
                            path={route.path}
                            render={props => <route.component {...props} />}
                        />
                    ))}
                </div>
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

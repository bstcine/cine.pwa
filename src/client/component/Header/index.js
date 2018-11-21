import React, { Component } from 'react';
import className from 'classnames';
import storeUtil from '@/util/storeUtil';
import { logoutV1, fetchData } from '@/service/base';
import Api from '@/../APIConfig';
import './header.less';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.renderNavRight = this.renderNavRight.bind(this);
        this.logout = this.logout.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleUserCenter = this.toggleUserCenter.bind(this);
        console.log(`storeUtil.getToken() ${storeUtil.getToken()}`);
        this.state = {
            logined: !!storeUtil.getToken(),
            isNavOpen: false,
            isUserCenterOpen: false,
            user: null,
        };
    }

    componentDidMount() {
        if (storeUtil.getToken()) {
            fetchData(Api.APIURL_User_Info).then(([err, result]) => {
                if (!err) {
                    this.setState({ user: result });
                }
            });
        }
    }

    closeNav(e) {
        e.stopPropagation();
        if (this.headerEle === e.target) {
            this.setState(preState => {
                if (preState.isNavOpen) return { isNavOpen: false };
            });
        }
    }

    logout() {
        logoutV1().then(() => {
            location.href = '/';
        });
    }

    toggleNav() {
        this.setState(preState => ({
            isNavOpen: !preState.isNavOpen,
        }));
    }

    toggleUserCenter() {
        this.setState(prevState => ({
            isUserCenterOpen: !prevState.isUserCenterOpen,
        }));
    }

    renderNavRight() {
        const { logined, isUserCenterOpen, user } = this.state;
        if (logined) {
            return (
                <ul className="nav-list-right">
                    <li className="nav-item login-btn">
                        <a href="/learn">学习系统</a>
                    </li>
                    <li
                        onClick={this.toggleUserCenter}
                        className={className('nav-item user-center', {
                            open: isUserCenterOpen,
                        })}
                    >
                        <a>
                            我的<i className="material-icons">&#xE5C5;</i>
                        </a>
                        <ul className="nav-list-inner">
                            <li className="nav-item">
                                <a href="/user">个人中心</a>
                            </li>
                            <li className="nav-item">
                                <a href="/resetPassword">修改密码</a>
                            </li>
                            <li className="nav-item">
                                <a href="/addFeedback">用户反馈</a>
                            </li>
                            <li className="nav-item">
                                {!!user &&
                                    (user.role_id === '1' ||
                                        user.role_id === '2') && (
                                        <a href="/mentor">老师批改</a>
                                    )}
                            </li>
                            <li className="nav-item">
                                <a onClick={this.logout}>退出</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            );
        }
        return (
            <ul className="nav-list-right guest-user">
                <li className="nav-item login-btn">
                    <a href="/learn">登入学习</a>
                </li>
                <li className="nav-item register-btn">
                    <a href="/auth/signup">注册</a>
                </li>
            </ul>
        );
    }

    render() {
        const { isShow } = this.props;
        if (!isShow) return null;
        const { isNavOpen } = this.state;
        console.log('header');
        return (
            <div className="container">
                <div
                    className={className('header', { open: isNavOpen })}
                    ref={ele => {
                        this.headerEle = ele;
                    }}
                    onClick={this.closeNav}
                >
                    <div className="nav-toggle-open" onClick={this.toggleNav} />
                    <div className="brand-logo">
                        <a href="/">
                            <img
                                src={require('@/asset/image/logo_bstcine.png')}
                                alt="brand-logo"
                            />
                        </a>
                    </div>
                    <div
                        ref={ele => {
                            this.navEle = ele;
                        }}
                        className="nav-list"
                        onClick={e => {
                            e.stopPropagation();
                        }}
                    >
                        <div
                            className="nav-toggle-close"
                            onClick={this.toggleNav}
                        />
                        <ul className="nav-list-left">
                            <li className="nav-item">
                                <a href="/">首页</a>
                            </li>
                            <li className="nav-item">
                                <a href="/about">关于善恩</a>
                            </li>
                            <li className="nav-item">
                                <a href="/comments">用户口碑</a>
                            </li>
                            <li className="nav-item">
                                <a href="/cooperation">合作与招商</a>
                            </li>
                            <li className="nav-item">
                                <a href="/appDownload">APP下载</a>
                            </li>
                            <li className="nav-item">
                                <a href="/libraryplan">善恩图书馆计划</a>
                            </li>
                        </ul>
                    </div>

                    {this.renderNavRight()}
                </div>
            </div>
        );
    }
}

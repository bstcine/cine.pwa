import React, {Component} from 'react';
import storeUtil from '@/util/storeUtil';
import {logoutV1, userInfo} from '@/service/base';
import './header.less';
import siteCodeUtil from '@/util/sitecodeUtil';
import uaUtil from '@/util/uaUtil';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.renderNavRight = this.renderNavRight.bind(this);
        this.logout = this.logout.bind(this);
        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.openUserCenterList = this.openUserCenterList.bind(this);
        this.closeUserCenterList = this.closeUserCenterList.bind(this);
        this.state = {
            user: null,
            isOpen: false,
            isUserCenterListOpen: false
        };
        this.needRender = !siteCodeUtil.inAPP() && !uaUtil.wechat();
    }

    async componentDidMount() {
        if (storeUtil.getToken()) {
            let {success, data: user} = await userInfo();
            if (success) {
                storeUtil.set('user', user);
                this.setState({
                    user: user
                });
            }
        }
    }

    logout() {
        logoutV1().then(() => {
            storeUtil.remove('token');
            storeUtil.remove('user');
            location.href = '/';
        });
    }

    openNav() {
        this.setState({
            isOpen: true
        });
    }

    closeNav() {
        if (this.state.isOpen) {
            this.setState({
                isOpen: false
            });
        }
    }

    openUserCenterList() {
        if (this.timer) clearTimeout(this.timer);
        this.setState({
            isUserCenterListOpen: true
        });
    }

    closeUserCenterList() {
        this.timer = setTimeout(() => {
            this.setState({
                isUserCenterListOpen: false
            });
        }, 300);
    }

    renderNavRight() {
        let {user, isUserCenterListOpen} = this.state;
        if (user) {
            return (
                <ul className="nav-list-right">
                    <li className="nav-item mypoint-btn">
                        <a href="/user/mypoint">我的积分</a>
                    </li>
                    <li
                        onMouseEnter={this.openUserCenterList}
                        onMouseLeave={this.closeUserCenterList}
                        className={isUserCenterListOpen ? 'nav-item user-center open' : 'nav-item user-center'}
                    >
                        <a href="javascript:">
                            我的 <i className="material-icons">arrow_drop_down</i>
                        </a>
                        <ul className="nav-list-inner">
                            <li className="nav-item">
                                <a href="/learn">学习首页</a>
                            </li>
                            <li className="nav-item">
                                <a href="/user/mypoint">个人中心</a>
                            </li>
                            <li className="nav-item">
                                <a href="/resetPassword">修改密码</a>
                            </li>
                            <li className="nav-item">
                                <a href="/addFeedback">用户反馈</a>
                            </li>
                            <li className="nav-item">
                                <a href="javascript:" onClick={this.logout}>
                                    退出
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="nav-list-right guest-user">
                    <li className="nav-item login-btn">
                        <a href="/learn">登入学习系统</a>
                    </li>
                    <li className="nav-item register-btn">
                        <a href="/register">免费注册</a>
                    </li>
                </ul>
            );
        }
    }

    render() {
        if (!this.needRender) return null;
        let {isOpen} = this.state;
        return (
            <div className="header-container">
                <div className={isOpen ? 'nav-wrap open' : 'nav-wrap'} onClick={this.closeNav}>
                    <div className="nav-toggle-open" onClick={this.openNav} />
                    <div className="brand-logo">
                        <div className="brand-logo-lg">
                            <a href="/">
                                <img src={require('@/asset/image/logo_bstcine.png')} alt="logo-lg" />
                            </a>
                        </div>
                        <div className="brand-logo-mini">
                            <a href="/">
                                <img src={require('@/asset/image/logo_bstcine_mini.png')} alt="logo-mini" />
                            </a>
                        </div>
                    </div>
                    <div
                        className="nav-list"
                        onClick={e => {
                            e.stopPropagation();
                        }}
                    >
                        <div className="nav-toggle-close" onClick={this.closeNav} />

                        {this.renderNavRight()}

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
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

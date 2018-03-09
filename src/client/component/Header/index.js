import React, {Component} from 'react';
import storeUtil from '@/util/storeUtil';
import {logoutV1, userInfo} from '@/service/base';
import './header.less';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.renderNavRight = this.renderNavRight.bind(this);
        this.logout = this.logout.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleUserCenter = this.toggleUserCenter.bind(this);
        console.log(`storeUtil.getToken() ${storeUtil.getToken()}`)
        this.state = {
            logined: !!storeUtil.getToken(),
            isNavOpen: false,
            isUserCenterOpen: false
        };
    }

    closeNav(e) {
        e.stopPropagation();
        if (this.headerEle === e.target) {
            this.setState(preState => {
                if (preState.isNavOpen) return {isNavOpen: false}
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
            isNavOpen: !preState.isNavOpen
        }));

    }

    toggleUserCenter() {
        this.setState(prevState => ({
            isUserCenterOpen: !prevState.isUserCenterOpen
        }));
    }

    renderNavRight() {
        let {logined, isUserCenterOpen} = this.state;
        if (logined) {
            return (
                <ul className="nav-list-right">
                    <li className="nav-item login-btn">
                        <a href="/learn">学习系统</a>
                    </li>
                    <li
                        onClick={this.toggleUserCenter}
                        className={isUserCenterOpen ? 'nav-item user-center open' : 'nav-item user-center'}
                    >
                        <a href="javascript:">
                            我的<i className="material-icons">&#xE5C5;</i>
                        </a>
                        <ul className="nav-list-inner">
                            <li className="nav-item">
                                <a href="/user/mypoint">我的积分</a>
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
                        <a href="/learn">登入学习</a>
                    </li>
                    <li className="nav-item register-btn">
                        <a href="/register">注册</a>
                    </li>
                </ul>
            );
        }
    }

    render() {
        let {isShow} = this.props;
        if (!isShow) return null;
        let {isNavOpen} = this.state;
        console.log('header')
        return (
            <div className="container">
                <div className={isNavOpen ? 'header open' : 'header'} ref={ele => this.headerEle = ele} onClick={this.closeNav}>
                    <div className="nav-toggle-open" onClick={this.toggleNav}/>
                    <div className="brand-logo">
                        <a href="/">
                            <img src={require('@/asset/image/logo_bstcine.png')} alt="brand-logo"/>
                        </a>
                    </div>
                    <div
                        ref={ele => this.navEle = ele}
                        className="nav-list"
                        onClick={e => {
                            e.stopPropagation();
                        }}
                    >
                        <div className="nav-toggle-close" onClick={this.toggleNav}/>
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
                                <a href="/studyabroad">善恩留学</a>
                            </li>
                        </ul>
                    </div>

                    {this.renderNavRight()}
                </div>
            </div>
        );
    }
}

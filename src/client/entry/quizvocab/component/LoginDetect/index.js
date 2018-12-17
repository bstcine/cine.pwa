import React, { Component } from 'react';
import Bridge from '@/util/bridge';
import BRIDGE_EVENT from '@/constant/bridgeEvent';
import siteCodeUtil from '@/util/sitecodeUtil';
import LoginModal from '@/component/LoginModal';

export default class LoginDetect extends Component {
    constructor(props) {
        super(props);
        console.log('LoginDetect constructor');
        this.goLoginClick = this.goLoginClick.bind(this);
        this.startClick = this.startClick.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.state = {
            showLoginModal: false,
        };
    }

    toggleLoginModal() {
        this.setState(prevState => ({
            showLoginModal: !prevState.showLoginModal,
        }));
    }

    async onLoginSuccess() {
        this.setState({
            showLoginModal: false,
        });
        this.props.history.replace('/');
    }

    goLoginClick() {
        if (siteCodeUtil.inIOSAPP()) {
            Bridge.ios(BRIDGE_EVENT.LOGIN).then(res => {
                this.props.history.replace(`/?token=${res.token}`);
            });
        } else if (siteCodeUtil.inAndroidAPP()) {
            Bridge.android(BRIDGE_EVENT.LOGIN).then(res => {
                this.props.history.replace(`/?token=${res.token}`);
            });
        } else {
            this.toggleLoginModal();
        }
    }

    startClick() {
        this.props.history.push('/userinfo');
    }

    render() {
        let { showLoginModal } = this.state;
        return (
            <div className="wrapper mini">
                <LoginModal
                    isOpen={showLoginModal}
                    toggleModal={this.toggleLoginModal}
                    onLoginSuccess={this.onLoginSuccess}
                />
                <div className="login-detect">
                    <div className="title">
                        系统检测到你<span className="orange">没有登录</span>，为了记录你的学习成长过程，强烈建议你<span className="blue">
                            登录
                        </span>系统后再进行测试
                    </div>
                    <div className="bg-welcome" />
                    <button
                        className="btn btn_orange margin-bottom-72"
                        onClick={this.goLoginClick}
                    >
                        登录系统
                    </button>
                    <button className="btn btn_blue" onClick={this.startClick}>
                        先测一下看看
                    </button>
                </div>
            </div>
        );
    }
}

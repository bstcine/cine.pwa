import React, { Component } from 'react';
import ReactModal from 'react-modal';
import '@/asset/style/modal.less';
import * as Service from '@/service/base';
import errorMsg from '@/util/errorMsg';
import { CButton } from '@/component/_base';
import ReactDOM from 'react-dom';
import authUtil from '@/util/authUtil';

export default class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.loginAction = this.loginAction.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.state = {
            username: '',
            password: '',
            loginBtn: '登录',
        };
    }

    handleCloseModal() {
        this.props.close();
    }

    handleUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }

    handlePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    async loginAction(e) {
        e.preventDefault();
        let username = this.state.username;
        let password = this.state.password;

        let res = await Service.login({ username, password });
        if (res.except_case_desc) {
            return alert(errorMsg(res.except_case_desc));
        }
        this.props.onSuccess && this.props.onSuccess();
    }

    render() {
        return (
            <ReactModal
                isOpen={this.props.isOpen}
                onRequestClose={this.handleCloseModal}
                ariaHideApp={false}
                className="login-modal"
                overlayClassName="modal-overlay"
                bodyOpenClassName="body-modal-open"
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
            >
                <div className="login-top">
                    登录
                    <span className="register-tip">
                        没有账号？<a href="/auth/signup">立即注册</a>
                    </span>
                </div>
                <form className="login-form" onSubmit={this.loginAction}>
                    <div className="form-control">
                        <i className="material-icons">&#xE7FF;</i>
                        <input
                            type="text"
                            className="username"
                            value={this.state.username}
                            placeholder="手机号或用户名"
                            onChange={this.handleUsername}
                        />
                    </div>
                    <div className="form-control">
                        <i className="material-icons">&#xE899;</i>
                        <input
                            type="password"
                            className="password"
                            value={this.state.password}
                            placeholder="密码"
                            onChange={this.handlePassword}
                        />
                    </div>

                    <button type="submit" className="login-btn">
                        {this.state.loginBtn}
                    </button>
                </form>
                <div className="login-bottom">
                    <a href="/auth/resetpwd">忘记密码？</a>

                    <CButton
                        block
                        onClick={authUtil.goWechatQrAuth}
                        target="_blank"
                        icon="ci-wechat"
                    >
                        微信登录
                    </CButton>
                </div>
            </ReactModal>
        );
    }
}

LoginModal.open = function(onSuccess) {
    function render(currentProps) {
        ReactDOM.render(<LoginModal {...currentProps} />, div);
    }
    function close() {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }

    const div = document.createElement('div');
    document.body.appendChild(div);
    const currentProps = { onSuccess, close, isOpen: true };

    render(currentProps);
    return {
        close,
    };
};

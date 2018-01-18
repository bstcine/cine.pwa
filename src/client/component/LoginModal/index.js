import React, {Component} from 'react';
import ReactModal from 'react-modal';
import '@/asset/style/modal.less';
import * as Service from '@/service/base';
import errorMsg from '@/util/errorMsg';
import storeUtil from '@/util/storeUtil';

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
            loginBtn: '登录'
        };
    }

    handleCloseModal() {
        this.props.toggleModal();
    }

    handleUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    handlePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    async loginAction(e) {
        e.preventDefault();
        let username = this.state.username;
        let password = this.state.password;

        let res = await Service.loginV1({username, password});
        if (!res.status) {
            return alert(errorMsg(res.msg));
        }
        storeUtil.setToken(res.token);
        this.props.loginSuccess();
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
                        没有账号？<a href="/register">立即注册</a>
                    </span>
                </div>
                <form className="login-form" onSubmit={this.loginAction}>
                    <div className="form-control">
                        <i className="material-icons">person_outline</i>
                        <input
                            type="text"
                            className="username"
                            value={this.state.username}
                            placeholder="用户名或手机号或邮箱"
                            onChange={this.handleUsername}
                        />
                    </div>
                    <div className="form-control">
                        <i className="material-icons">lock_outline</i>
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
                    <a href="/resetPassword">忘记密码？</a>
                </div>
            </ReactModal>
        );
    }
}

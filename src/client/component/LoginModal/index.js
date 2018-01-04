import React, {Component} from 'react';
import ReactModal from 'react-modal'
import '@/asset/style/modal.less'
import * as Service from '@/service/base'
import errorMsg from '@/util/errorMsg'

export default class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.loginAction = this.loginAction.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.state = {
            username: "",
            password: "",
            loginBtn: '登录'
        }
    }

    handleCloseModal() {
        this.props.toggleModal()
    }

    handleUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    handlePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    async loginAction(e) {
        e.preventDefault();
        let username = this.state.username;
        let password = this.state.password;

        let res = await Service.loginV1({username, password});
        if (!res.status) {
            return alert(errorMsg(res.msg))
        }
        this.props.loginSuccess()
    }

    render() {
        return (
            <ReactModal isOpen={this.props.isOpen}
                        onRequestClose={this.handleCloseModal}
                        ariaHideApp={false}
                        className="login-modal"
                        overlayClassName="modal-overlay"
                        shouldCloseOnOverlayClick={true}
                        shouldCloseOnEsc={true}>
                <div className="login-top">登录
                    <span className="register-tip">没有账号？<a href="/register">立即注册</a></span>
                </div>
                <form className="login-form" onSubmit={this.loginAction}>
                    <input type="text" className="username" value={this.state.username} placeholder="用户名或手机号或邮箱" onChange={this.handleUsername}/>
                    <input type="password" className="password" value={this.state.password} placeholder="密码" onChange={this.handlePassword}/>
                    <button type="submit" className="login-btn">{this.state.loginBtn}</button>
                </form>
                <div className="login-bottom">
                    <a href="/resetPassword">忘记密码？</a>
                </div>

            </ReactModal>
        );
    }
}


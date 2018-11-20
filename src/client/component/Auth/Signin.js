import React, { Component } from 'react';
import { CButton, CIcon, CMessage } from "@/component/_base";
import authUtil from '@/util/authUtil';
import { fetchData } from '@/service/base';
import Api from '../../../APIConfig';
import errorMsg from "@/util/errorMsg";

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            go: '',
        };
        this.login = this.login.bind(this);
    }

    async login() {
        const { phone, password } = this.state;
        const { onSuccess } = this.props;
        let [err] = await fetchData(Api.APIURL_Auth_Signin, { phone, password });
        if (err) return CMessage.info(errorMsg(err));
        onSuccess && onSuccess()
    }

    render() {
        const { phone, password } = this.state;
        const { toggle } = this.props;
        return (
            <div className="cine-auth__container">
                <div className="cine_auth__title">
                    登录
                    <span
                        className="cine_auth__opera"
                        onClick={() => {
                            toggle('signup');
                        }}
                    >
                        注册
                    </span>
                </div>

                <div className="cine_auth__form">
                    <div className="cine_auth__form-control">
                        <CIcon>person</CIcon>
                        <input
                            type="text"
                            placeholder="手机号或邮箱"
                            value={phone}
                            onChange={e => {
                                this.setState({ phone: e.target.value });
                            }}
                        />
                    </div>

                    <div className="cine_auth__form-control">
                        <CIcon>lock</CIcon>
                        <input
                            type="password"
                            placeholder="密码"
                            value={password}
                            onChange={e => {
                                this.setState({ password: e.target.value });
                            }}
                        />
                    </div>
                </div>

                <div className="cine_auth__help">
                    <span
                        onClick={() => {
                            toggle('resetpwd');
                        }}
                    >
                        忘记密码？
                    </span>
                </div>

                <CButton
                    block
                    variant="contained"
                    color="primary"
                    onClick={this.login}
                >
                    登录
                </CButton>

                <div className="cine_auth__social">
                    <div className="line-through">社交账号登录</div>
                    <div className="cine_auth__apps">
                        <CIcon
                            className="cine_auth__app cine_auth__app--wechat"
                            onClick={authUtil.goWechatQrAuth}
                        >
                            ci-wechat
                        </CIcon>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signin;

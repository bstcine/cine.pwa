import React, { Component } from 'react';
import { CButton, CIcon } from '@/component/_base';
import phoneCode from '@/constant/phoneCode';
import QRHelp from '@/component/QRHelp';
import { Link } from 'react-router-dom';

class ResetPwd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone_code: '86',
            phone: '',
            pwd: '',
            auth_code: '',
            auth_code_btn_disabled: false,
            auth_code_btn: '发送验证码',
        };
        this.login = this.login.bind(this);
    }

    login() {}

    render() {
        const {
            phone_code,
            phone,
            pwd,
            auth_code,
            auth_code_btn_disabled,
            auth_code_btn,
        } = this.state;
        return (
            <div className="cine-auth__container">
                <div className="cine_auth__title">
                    重置密码<Link to="/auth/signin">登录</Link>
                </div>

                <div className="cine_auth__form">
                    <div className="cine_auth__form-control">
                        <CIcon>phone_iphone</CIcon>
                        <select
                            value={phone_code}
                            onChange={e => {
                                this.setState({ phone_code: e.target.value });
                            }}
                        >
                            {phoneCode.map(({ code, name }) => (
                                <option value={code} key={code + name}>
                                    {`+${code} ${name}`}
                                </option>
                            ))}
                        </select>
                        <input
                            className="cine_input"
                            type="tel"
                            placeholder="手机号"
                            value={phone}
                            onChange={e => {
                                this.setState({ phone: e.target.value });
                            }}
                        />
                    </div>

                    <div className="cine_auth__form-control cine_auth__auth-code">
                        <CIcon>verified_user</CIcon>
                        <input
                            type="tel"
                            placeholder="短信验证码"
                            value={auth_code}
                            onChange={e => {
                                this.setState({ auth_code: e.target.value });
                            }}
                        />
                        <CButton
                            size="small"
                            variant="outlined"
                            color="primary"
                            shape="capsule"
                            disabled={auth_code_btn_disabled}
                            onClick={this.sendAuthCode}
                        >
                            {auth_code_btn}
                        </CButton>
                    </div>

                    <div className="cine_auth__form-control">
                        <CIcon>lock</CIcon>
                        <input
                            type="password"
                            placeholder="设置密码"
                            value={pwd}
                            onChange={e => {
                                this.setState({ pwd: e.target.value });
                            }}
                        />
                    </div>
                </div>



                <CButton
                    block
                    variant="contained"
                    color="primary"
                    onClick={this.login}
                >
                    提交
                </CButton>
            </div>
        );
    }
}

export default ResetPwd;

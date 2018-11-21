import React, { Component } from 'react';
import { CButton, CIcon, CMessage } from "@/component/_base";
import phoneCode from '@/constant/phoneCode';
import { COption } from '@/component/CSelect';
import CSelect from '@/component/CSelect';
import { fetchData } from "@/service/base";
import { APIURL_Auth_Reset_Password, APIURL_Auth_Send_VerificationCode, APIURL_Auth_SignUp } from "../../../APIConfig";
import errorMsg from "@/util/errorMsg";

class ResetPwd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone_code: '86',
            phone: '',
            password: '',
            auth_code: '',
            auth_code_btn_disabled: false,
            auth_code_btn: '发送验证码',
        };
        this.submit = this.submit.bind(this);
        this.sendAuthCode = this.sendAuthCode.bind(this);
    }

    async sendAuthCode() {
        const { phone_code, phone } = this.state;
        const [err, res] = await fetchData(APIURL_Auth_Send_VerificationCode, {
            phone,
            phone_code,
            type: '1',
            resetPassword: 'true'
        });
        if (err) return CMessage.info(errorMsg(err));
        CMessage.success('发送成功');
    }

    async submit() {
        const { onSuccess } = this.props;
        const { phone_code, phone, password, auth_code } = this.state;
        const [err, res] = await fetchData(APIURL_Auth_Reset_Password, {
            phone,
            phone_code,
            auth_code,
            password,
            type: '1',
        });
        if (err) return CMessage.info(errorMsg(err));
        CMessage.success('重置成功', () => {
            onSuccess && onSuccess();
        });
    }

    render() {
        const {
            phone_code,
            phone,
            password,
            auth_code,
            auth_code_btn_disabled,
            auth_code_btn,
        } = this.state;
        const { toggle } = this.props;
        return (
            <div className="cine-auth__container">
                <div className="cine_auth__title">
                    重置密码
                    <span
                        className="cine_auth__opera"
                        onClick={() => {
                            toggle('signin');
                        }}
                    >
                        登录
                    </span>
                </div>

                <div className="cine_auth__form">
                    <div className="cine_auth__form-control">
                        <CIcon>phone_iphone</CIcon>
                        <CSelect
                            className="cine_auth__select"
                            value={phone_code}
                            onChange={value => {
                                this.setState({ phone_code: value });
                            }}
                            renderLabel={option => `+${option.value}`}
                        >
                            {phoneCode.map(({ code, name }) => (
                                <COption value={code} key={code + name}>
                                    {`+${code} ${name}`}
                                </COption>
                            ))}
                        </CSelect>
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
                            value={password}
                            onChange={e => {
                                this.setState({ password: e.target.value });
                            }}
                        />
                    </div>
                </div>

                <CButton
                    block
                    variant="contained"
                    color="primary"
                    onClick={this.submit}
                >
                    提交
                </CButton>
            </div>
        );
    }
}

export default ResetPwd;

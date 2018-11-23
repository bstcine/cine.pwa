import React, { Component } from 'react';
import { CButton, CIcon, CMessage } from '@/component/_base';
import phoneCode from '@/constant/phoneCode';
import CSelect, { COption } from '@/component/CSelect';
import { fetchData } from '@/service/base';
import {
    APIURL_Auth_Send_VerificationCode,
    APIURL_Auth_SignUp,
} from '../../../APIConfig';
import errorMsg from '@/util/errorMsg';
import authUtil from '@/util/authUtil';
import commonUtil from '@/util/common';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone_code: '86',
            phone: '',
            password: '',
            auth_code: '',
            auth_code_btn_disabled: false,
            auth_code_btn: '发送验证码',
            submit_btn_disabled: false,
            submit_btn: '注册',
        };
        this.submit = this.submit.bind(this);
        this.sendAuthCode = this.sendAuthCode.bind(this);
    }

    async sendAuthCode() {
        const { phone_code, phone } = this.state;
        this.setState({ auth_code_btn_disabled: true });
        fetchData(APIURL_Auth_Send_VerificationCode, {
            phone,
            phone_code,
            type: '1',
        }).then(([err, res]) => {
            if (!err) {
                commonUtil.smsCountDown((text, disabled) => {
                    this.setState({
                        auth_code_btn: text,
                        auth_code_btn_disabled: disabled,
                    });
                });
                CMessage.success('发送成功');
            } else {
                this.setState({ auth_code_btn_disabled: false });
                if (err) return CMessage.info(errorMsg(err));
            }
        });
    }

    async submit() {
        const { onSuccess } = this.props;
        const { phone_code, phone, password, auth_code } = this.state;
         this.setState({ submit_btn_disabled: true, submit_btn: '提交中' });
        const [err, res] = await fetchData(APIURL_Auth_SignUp, {
            phone,
            phone_code,
            auth_code,
            password,
            type: '1',
        });
         this.setState({ submit_btn_disabled: false, submit_btn: '注册' });
        if (err) return CMessage.info(errorMsg(err));
        CMessage.success('注册成功', () => {
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
            submit_btn_disabled,
            submit_btn,
        } = this.state;
        const { toggle } = this.props;
        return (
            <div className="cine-auth__container">
                <div className="cine_auth__title">
                    注册
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
                    size="large"
                    variant="contained"
                    color="primary-light"
                    shape="capsule"
                    disabled={submit_btn_disabled}
                    onClick={this.submit}
                >
                    {submit_btn}
                </CButton>

                <div className="cine_auth__social">
                    <div className="line-through">社交账号直接注册</div>
                    <div className="cine_auth__apps">
                        <CIcon
                            className="cine_auth__app cine_auth__app--wechat"
                            onClick={authUtil.goWechatAuth}
                        >
                            ci-wechat
                        </CIcon>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;

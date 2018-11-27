import React, { Component } from 'react';
import './style.less';
import { CButton, CIcon, CMessage } from '@/component/_base';
import phoneCode from '@/constant/phoneCode';
import { fetchData } from '@/service/base';
import Api from '../../../APIConfig';
import errorMsg from '@/util/errorMsg';
import { getParam } from '@/util/urlUtil';
import CSelect, { COption } from '@/component/CSelect';
import commonUtil from '@/util/common';

class Bind extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone_code: '86',
            phone: '',
            auth_code: '',
            auth_code_btn_disabled: false,
            auth_code_btn: '发送验证码',
            submit_btn_disabled: false,
            submit_btn: '关联',
        };
        this.sendAuthCode = this.sendAuthCode.bind(this);
        this.submit = this.submit.bind(this);
        this.listener = this.listener.bind(this);
    }
    componentDidMount() {
        window.addEventListener('keydown', this.listener, true);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.listener, true);
    }
    listener(event) {
        if (event.code === 'Enter') {
            this.submit();
        }
    }

    sendAuthCode() {
        const { phone_code, phone } = this.state;
        const { bind_with } = getParam();
        this.setState({ auth_code_btn_disabled: true });
        let url =
            bind_with === 'wechat'
                ? Api.APIURL_Auth_Send_AuthCode
                : Api.APIURL_Auth_Send_VerificationCode;
        let data =
            bind_with === 'wechat'
                ? {
                      type: 3,
                      phone_code,
                      phone,
                  }
                : {
                      type: '1',
                      phone,
                      phone_code,
                  };
        fetchData(url, data).then(([err, res]) => {
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
        const { phone_code, phone, auth_code } = this.state;
        const { unionid_code, redirect, bind_with } = getParam();
        this.setState({ submit_btn_disabled: true, submit_btn: '提交中' });
        let url =
            bind_with === 'wechat'
                ? Api.APIURL_Auth_Bind_Phone
                : Api.APIURL_Auth_Reset_Phone;
        let data =
            bind_with === 'wechat'
                ? {
                      auth_code,
                      phone_code,
                      phone,
                      unionid_code,
                  }
                : {
                      type: '1',
                      auth_code,
                      phone_code,
                      phone,
                  };
        let [err, res] = await fetchData(url, data);
        this.setState({ submit_btn_disabled: false, submit_btn: '关联' });
        if (err) return CMessage.info(errorMsg(err));
        CMessage.success('绑定成功', () => {
            if (redirect) {
                location.href = decodeURIComponent(redirect);
            } else {
                location.href = '/';
            }
        });
    }

    render() {
        const {
            phone_code,
            phone,
            auth_code,
            auth_code_btn_disabled,
            auth_code_btn,
            submit_btn_disabled,
            submit_btn,
        } = this.state;
        return (
            <div className="cine-auth__container">
                <div className="cine_auth__title">绑定手机</div>

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
            </div>
        );
    }
}

export default Bind;

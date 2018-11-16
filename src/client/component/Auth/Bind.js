import React, { Component } from 'react';
import './style.less';
import { CButton, CIcon } from '@/component/_base';
import phoneCode from '@/constant/phoneCode';
import { fetchData } from '@/service/base';
import Api from '../../../APIConfig';
import errorMsg from '@/util/errorMsg';
import { CMessage } from '@/component/_base';
import { getParam } from '@/util/urlUtil';

class Bind extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone_code: '86',
            phone: '',
            auth_code: '',
            auth_code_btn_disabled: false,
            auth_code_btn: '发送验证码',
        };
        this.sendAuthCode = this.sendAuthCode.bind(this);
        this.bindAccount = this.bindAccount.bind(this);
    }

    sendAuthCode() {
        const { phone_code, phone } = this.state;
        fetchData(Api.APIURL_Auth_Send_AuthCode, {
            type: 3,
            phone_code,
            phone,
        }).then(([err, result]) => {
            if (err) return CMessage.info(errorMsg(err));
            CMessage.success('发送成功');
        });
    }

    bindAccount() {
        const { phone_code, phone, auth_code } = this.state;
        const { openid, redirect } = getParam();
        fetchData(Api.APIURL_Auth_Bind_Phone, {
            auth_code,
            phone_code,
            phone,
            openid,
        }).then(([err, result]) => {
            if (err) return CMessage.info(errorMsg(err));
            CMessage.success('绑定成功', () => {
                if (redirect) {
                    location.href = decodeURIComponent(redirect);
                } else {
                    location.href = '/';
                }
            });
        });
    }

    render() {
        const {
            phone_code,
            phone,
            auth_code,
            auth_code_btn_disabled,
            auth_code_btn,
        } = this.state;
        return (
            <div className="cine-auth__container">
                <div className="cine_auth__title">
                    绑定手机
                    <span>
                        <a href="/login">返回登录</a>
                    </span>
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
                </div>

                <CButton
                    block
                    variant="contained"
                    color="primary"
                    onClick={this.bindAccount}
                >
                    关联
                </CButton>
            </div>
        );
    }
}

export default Bind;

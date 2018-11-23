import React, { Component } from 'react';
import { CButton, CIcon, CMessage } from '@/component/_base';
import authUtil from '@/util/authUtil';
import { fetchData } from '@/service/base';
import Api from '../../../APIConfig';
import errorMsg from '@/util/errorMsg';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            submit_btn_disabled: false,
            submit_btn: '登录',
        };
        this.submit = this.submit.bind(this);
    }

    async submit() {
        const { phone, password } = this.state;
        const { onSuccess } = this.props;
        this.setState({ submit_btn_disabled: true, submit_btn: '登录中' });
        let [err] = await fetchData(Api.APIURL_Auth_SignIn, {
            phone,
            password,
        });
        this.setState({ submit_btn_disabled: false, submit_btn: '登录' });
        if (err) return CMessage.info(errorMsg(err));
        CMessage.success('登录成功', 1000, () => {
            onSuccess && onSuccess();
        });
    }

    render() {
        const { phone, password, submit_btn_disabled, submit_btn } = this.state;
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
                    <div className="line-through">社交账号登录</div>
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

export default SignIn;

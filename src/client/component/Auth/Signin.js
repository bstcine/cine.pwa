import React, { Component } from 'react';
import { CButton, CIcon } from '@/component/_base';
import { Link } from "react-router-dom";

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state={
            phone:'',
            pwd:'',
            go:'',
        };
        this.login = this.login.bind(this);
    }

    login(){

    }

    render() {
        const {phone,pwd} = this.state;
        return (
            <div className="cine-auth__container">
                <div className="cine_auth__title">
                    登录
                    <Link to='/auth/signup'>注册</Link>
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
                            value={pwd}
                            onChange={e => {
                                this.setState({ pwd: e.target.value });
                            }}
                        />
                    </div>
                </div>

                <div className="cine_auth__help">
                    <Link to='/auth/resetpwd'>忘记密码？</Link>
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
                        <CIcon className='cine_auth__app cine_auth__app--wechat'>ci-wechat</CIcon>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signin;

import React, { Component } from 'react';
import QRHelp from '@/component/QRHelp';
import CAuth from '@/component/Auth';
import AuthLogo from '@/entry/auth/component/AuthLogo';
import { getParam } from '@/util/urlUtil';

class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.type = 'signup';
        if (location.pathname.includes('signin')) {
            this.type = 'signin';
        } else if (location.pathname.includes('resetpwd')) {
            this.type = 'resetpwd';
        }
    }

    render() {
        return (
            <div className="cine-auth__page">
                <AuthLogo />
                <div className="cine-auth__main">
                    <CAuth
                        type={this.type}
                        onSignUpSuccess={_this => {
                            _this.toggle('signin');
                        }}
                        onResetPwdSuccess={_this => {
                            _this.toggle('signin');
                        }}
                        onSignInSuccess={() => {
                            const { redirect } = getParam();
                            if (redirect) {
                                location.href = redirect;
                            } else {
                                location.href = '/';
                            }
                        }}
                    />

                    <div className="cine_auth__tips">
                        <span onClick={QRHelp.open}>遇到问题？</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthPage;

import React, { Component } from 'react';
import CAuth from '@/component/Auth';
import { getParam } from '@/util/urlUtil';
import QRHelp from '@/component/QRHelp';
import AuthLogo from '@/entry/auth/component/AuthLogo';

class SignInPage extends Component {
    render() {
        return (
            <div className="cine-auth__page">
                <AuthLogo />
                <div className="cine-auth__main">
                    <CAuth
                        type="signin"
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

export default SignInPage;

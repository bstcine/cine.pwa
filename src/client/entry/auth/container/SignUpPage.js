import React, { Component } from 'react';
import QRHelp from '@/component/QRHelp';
import CAuth from '@/component/Auth';
import AuthLogo from "@/entry/auth/component/AuthLogo";

class SignUpPage extends Component {
    render() {
        return (
            <div className="cine-auth__page">
                <AuthLogo />
                <div className="cine-auth__main">
                    <CAuth
                        type="signup"
                        onSignUpSuccess={() => {
                            location.href = '/auth/signin';
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

export default SignUpPage;

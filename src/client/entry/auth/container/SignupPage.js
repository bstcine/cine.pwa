import React, { Component } from 'react';
import QRHelp from '@/component/QRHelp';
import CAuth from '@/component/Auth';

class SignupPage extends Component {
    render() {
        return (
            <div className="cine-auth__page">
                <CAuth
                    type="signup"
                    onSuccess={() => {
                        location.href = '/auth/signin';
                    }}
                />

                <div className="cine_auth__help">
                    <span onClick={QRHelp.open}>遇到问题？</span>
                </div>
            </div>
        );
    }
}

export default SignupPage;

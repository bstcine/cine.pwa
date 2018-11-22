import React, { Component } from 'react';
import QRHelp from '@/component/QRHelp';
import CAuth from '@/component/Auth';

class ResetPwdPage extends Component {
    render() {
        console.log('ResetPwdPage');
        return (
            <div className="cine-auth__page">
                <div className="cine-auth__main">
                    <CAuth
                        type="resetpwd"
                        onRestPwdSuccess={() => {
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

export default ResetPwdPage;

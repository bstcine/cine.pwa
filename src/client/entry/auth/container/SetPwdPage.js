import React, { Component } from 'react';
import { CSetPwd } from '@/component/Auth';
import QRHelp from '@/component/QRHelp';
import AuthLogo from '@/entry/auth/component/AuthLogo';

class SetPwdPage extends Component {
    render() {
        return (
            <div className="cine-auth__page">
                <AuthLogo />
                <div className="cine-auth__main">
                    <CSetPwd />
                    <div className="cine_auth__tips">
                        <span onClick={QRHelp.open}>遇到问题？</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default SetPwdPage;

import React, { Component } from 'react';
import { CBind } from '@/component/Auth';
import QRHelp from '@/component/QRHelp';
import AuthLogo from '@/entry/auth/component/AuthLogo';

class BindPage extends Component {
    render() {
        return (
            <div className="cine-auth__page">
                <AuthLogo />
                <div className="cine-auth__main">
                    <CBind />
                    <div className="cine_auth__tips">
                        <span onClick={QRHelp.open}>遇到问题？</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default BindPage;

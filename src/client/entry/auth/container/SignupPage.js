import React, { Component } from 'react';
import { CSignup } from '@/component/Auth';
import QRHelp from "@/component/QRHelp";

class SignupPage extends Component {
    render() {
        return (
            <div className="cine-auth__page">
                <CSignup />
                <div className="cine_auth__help">
                    <span onClick={QRHelp.open}>遇到问题？</span>
                </div>
            </div>
        );
    }
}

export default SignupPage;

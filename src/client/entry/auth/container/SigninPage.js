import React, { Component } from 'react';
import CAuth from '@/component/Auth';
import { getParam } from '@/util/urlUtil';
import QRHelp from "@/component/QRHelp";

class SigninPage extends Component {
    render() {
        return (
            <div className="cine-auth__page">
                <CAuth
                    type="signin"
                    onSuccess={() => {
                        const { redirect } = getParam();
                        if (redirect) {
                            location.href = redirect;
                        } else {
                            location.href = '/';
                        }
                    }}
                />

                <div className="cine_auth__help">
                    <span onClick={QRHelp.open}>遇到问题？</span>
                </div>
            </div>
        );
    }
}

export default SigninPage;

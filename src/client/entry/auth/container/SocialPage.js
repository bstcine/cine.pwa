import React, { Component } from 'react';
import { CSocial } from '@/component/Auth';
import AuthLogo from '@/entry/auth/component/AuthLogo';

class SocialPage extends Component {
    render() {
        return (
            <div className="cine-auth__page">
                <AuthLogo />
                <div className="cine-auth__main">
                    <CSocial />
                </div>
            </div>
        );
    }
}

export default SocialPage;

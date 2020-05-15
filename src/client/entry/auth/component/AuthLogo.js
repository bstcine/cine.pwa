import React, { Component } from 'react';

class AuthLogo extends Component {
    render() {
        return (
            <div className="cine-auth__logo">
                <img
                    src={require('@/entry/auth/asset/image/logo-light-blue.png')}
                    alt="logo"
                />
            </div>
        );
    }
}

export default AuthLogo;

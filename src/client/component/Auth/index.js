import CBind from './Bind';
import CConfirm from './Confirm';
import CSignIn from './SignIn';
import CSignUp from './SignUp';
import CResetPwd from './ResetPwd';
import CSocial from './Social';
import CSetPwd from './SetPwd';
import React, { Component } from 'react';

class CAuth extends Component {
    constructor(props) {
        super(props);
        this.state = { type: this.props.type || 'signin' };
        this.toggle = this.toggle.bind(this);
    }

    toggle(type) {
        this.setState({
            type,
        });
    }

    render() {
        const { type } = this.state;
        const {
            onSignInSuccess,
            onSignUpSuccess,
            onResetPwdSuccess,
        } = this.props;
        switch (type) {
            case 'signin':
                return (
                    <CSignIn
                        toggle={this.toggle}
                        onSuccess={() => {
                            // this.toggle('signin');
                            onSignInSuccess && onSignInSuccess(this);
                        }}
                    />
                );
            case 'signup':
                return (
                    <CSignUp
                        toggle={this.toggle}
                        onSuccess={() => {
                            // this.toggle('signin');
                            onSignUpSuccess && onSignUpSuccess(this);
                        }}
                    />
                );
            case 'resetpwd':
                return (
                    <CResetPwd
                        toggle={this.toggle}
                        onSuccess={() => {
                            // this.toggle('signin');
                            onResetPwdSuccess && onResetPwdSuccess(this);
                        }}
                    />
                );
        }
    }
}

export default CAuth;

export { CBind, CConfirm, CSignIn, CSignUp, CResetPwd, CSocial, CSetPwd };

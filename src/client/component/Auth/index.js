import CBind from './Bind';
import CConfirm from './Confirm';
import CSignIn from './SignIn';
import CSignUp from './SignUp';
import CResetPwd from './ResetPwd';
import CSocial from './Social';
import CSetPwd from './SetPwd';
import React, { Component } from 'react';
import './style.less';

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
            signInAction
        } = this.props;
        switch (type) {
            case 'signin':
                return (
                    <CSignIn
                        toggle={this.toggle}
                        action={signInAction}
                        onSuccess={(res) => {
                            // this.toggle('signin');
                            onSignInSuccess && onSignInSuccess.call(this, res);
                        }}
                    />
                );
            case 'signup':
                return (
                    <CSignUp
                        toggle={this.toggle}
                        onSuccess={() => {
                            // this.toggle('signin');
                            onSignUpSuccess && onSignUpSuccess.call(this);
                        }}
                    />
                );
            case 'resetpwd':
                return (
                    <CResetPwd
                        toggle={this.toggle}
                        onSuccess={() => {
                            // this.toggle('signin');
                            onResetPwdSuccess && onResetPwdSuccess.call(this);
                        }}
                    />
                );
        }
    }
}

export default CAuth;

export { CBind, CConfirm, CSignIn, CSignUp, CResetPwd, CSocial, CSetPwd };

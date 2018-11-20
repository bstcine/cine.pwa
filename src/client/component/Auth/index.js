import CBind from './Bind';
import CConfirm from './Confirm';
import CSignin from './Signin';
import CSignup from './Signup';
import CResetPwd from './ResetPwd';
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
        const { onSuccess } = this.props;
        switch (type) {
            case 'signin':
                return <CSignin toggle={this.toggle} onSuccess={onSuccess} />;
            case 'signup':
                return <CSignup toggle={this.toggle} onSuccess={onSuccess} />;
            case 'resetpwd':
                return <CResetPwd toggle={this.toggle} onSuccess={onSuccess} />;
        }
    }
}

export default CAuth;

export { CBind, CConfirm, CSignin, CSignup, CResetPwd };

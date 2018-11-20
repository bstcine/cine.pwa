import React, { Component } from 'react';
import { CSignin } from '@/component/Auth';

class BindPage extends Component {
    render() {
        return (
            <div className="cine-auth__page">
                <CSignin />
            </div>
        );
    }
}

export default BindPage;

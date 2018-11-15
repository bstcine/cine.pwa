import React, { Component } from 'react';
import { CBind } from '@/component/Auth';

class BindPage extends Component {
    render() {
        return (
            <div className="cine-auth__page">
                <CBind />
            </div>
        );
    }
}

export default BindPage;

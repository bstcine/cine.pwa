import React, { Component } from 'react';
import { CBind } from '@/component/Auth';
import QRHelp from "@/component/QRHelp";

class BindPage extends Component {
    render() {
        return (
            <div className="cine-auth__page">
                <CBind />
                <div className="cine_auth__help">
                    <span onClick={QRHelp.open}>遇到问题？</span>
                </div>
            </div>
        );
    }
}

export default BindPage;

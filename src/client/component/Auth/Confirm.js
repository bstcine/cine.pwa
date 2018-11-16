import React, { Component } from 'react';
import './style.less';
import { CButton } from '@/component/_base';

class Confirm extends Component {

    render() {
        const {
            onConfirm,
            head_image,
            phone
        } = this.props;
        return (
            <div className="cine-auth__container">
                <div className="cine_auth__title">
                    登录善恩
                    {/*<span>*/}
                        {/*<a href="/login">切换账号</a>*/}
                    {/*</span>*/}
                </div>

                <div className="cine_auth__profile">
                    <div className="cine_auth__headimg">
                        <img src={head_image} alt=""/>
                    </div>
                    <div className="cine_auth__phone">
                        {phone}
                    </div>
                </div>

                <CButton
                    block
                    variant="contained"
                    color="primary"
                    onClick={onConfirm}
                >
                    登录
                </CButton>
            </div>
        );
    }
}

export default Confirm;

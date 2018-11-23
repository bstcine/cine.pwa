import React, { Component } from 'react';
import './style.less';
import { CButton } from '@/component/_base';
import { getParam } from '@/util/urlUtil';
import { fetchData } from '@/service/base';
import { APIURL_Auth_Confirm } from '../../../APIConfig';

class Confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submit_btn_disabled: false,
            submit_btn: '登录',
        };
        this.submit = this.submit.bind(this);
        this.listener = this.listener.bind(this);
    }
    componentDidMount() {
        window.addEventListener('keydown', this.listener, true);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.listener, true);
    }
    listener(event) {
        if (event.code === 'Enter') {
            this.submit();
        }
    }

    async submit() {
        const { code, redirect } = getParam();
        this.setState({ submit_btn_disabled: true, submit_btn: '登录中' });
        let [err] = await fetchData(APIURL_Auth_Confirm, { code });
        this.setState({ submit_btn_disabled: false, submit_btn: '登录' });
        if (!err) location.href = decodeURIComponent(redirect);
    }

    render() {
        const { head_image, phone } = this.props;
        const { submit_btn_disabled, submit_btn } = this.state;
        return (
            <div className="cine-auth__container">
                <div className="cine_auth__title">登录善恩</div>

                <div className="cine_auth__profile">
                    <div className="cine_auth__headimg">
                        <img src={head_image} alt="" />
                    </div>
                    <div className="cine_auth__phone">{phone}</div>
                </div>

                <CButton
                    block
                    size="large"
                    variant="contained"
                    color="primary-light"
                    shape="capsule"
                    disabled={submit_btn_disabled}
                    onClick={this.submit}
                >
                    {submit_btn}
                </CButton>
            </div>
        );
    }
}

export default Confirm;

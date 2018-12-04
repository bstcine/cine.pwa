import React, { Component } from 'react';
import { CButton, CIcon, CMessage } from '@/component/_base';
import { fetchData } from '@/service/base';
import { APIURL_Auth_Set_Password } from '../../../APIConfig';
import errorMsg from '@/util/errorMsg';
import { getParam } from '@/util/urlUtil';
import checkUtil from '@/util/checkUtil';

class SetPwd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            submit_btn_disabled: false,
            submit_btn: '设置',
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
        const { password } = this.state;
        if (!checkUtil.isPassword(password))
            return CMessage.info('密码格式不正确');
        this.setState({ submit_btn_disabled: true, submit_btn: '提交中' });
        const [err, res] = await fetchData(APIURL_Auth_Set_Password, {
            password,
        });
        this.setState({ submit_btn_disabled: false, submit_btn: '设置' });
        if (err) return CMessage.info(errorMsg(err));
        CMessage.success('设置成功', () => {
            const { redirect } = getParam();
            location.href = redirect ? decodeURIComponent(redirect) : '/';
        });
    }

    render() {
        const { password, submit_btn_disabled, submit_btn } = this.state;
        return (
            <div className="cine-auth__container">
                <div className="cine_auth__title">设置初始密码</div>

                <div className="cine_auth__form">
                    <div className="cine_auth__form-control">
                        <CIcon>lock</CIcon>
                        <input
                            type="password"
                            placeholder="设置密码"
                            value={password}
                            onChange={e => {
                                this.setState({ password: e.target.value });
                            }}
                        />
                    </div>
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

export default SetPwd;

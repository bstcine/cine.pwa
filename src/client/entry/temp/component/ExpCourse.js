import React, { Component } from 'react';
import { CButton, CIcon, CMessage } from '@/component/_base';
import '../asset/style/exp-course.less';
import commonUtil from '@/util/_base/commonUtil';
import { fetchData } from '@/service/base';
import {
    APIURL_Auth_Auto_Signin,
    APIURL_Auth_Send_VerificationCode,
    APIURL_Temp_User_Exp_Course,
} from '../../../../APIConfig';
import errorMsg from '@/util/errorMsg';

class ExpCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            auth_code: '',
            promote_code: '',
            auth_code_btn_disabled: false,
            auth_code_btn: '发送验证码',
            submit_btn_disabled: false,
            submit_btn: '立即领取',
        };
        this.submit = this.submit.bind(this);
        this.sendAuthCode = this.sendAuthCode.bind(this);
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

    async sendAuthCode() {
        const { phone } = this.state;
        if (!commonUtil.isPhone(86, phone))
            return CMessage.info('手机格式不正确');
        this.setState({ auth_code_btn_disabled: true });
        fetchData(APIURL_Auth_Send_VerificationCode, {
            phone,
            type: '1',
            need_check: false,
        }).then(([err, res]) => {
            if (!err) {
                commonUtil.smsCountDown((text, disabled) => {
                    this.setState({
                        auth_code_btn: text,
                        auth_code_btn_disabled: disabled,
                    });
                });
                CMessage.success('发送成功');
            } else {
                this.setState({ auth_code_btn_disabled: false });
                if (err) return CMessage.info(errorMsg(err));
            }
        });
    }

    async submit() {
        const { phone, auth_code, promote_code } = this.state;
        if (!commonUtil.isPhone(86, phone))
            return CMessage.info('手机格式不正确');
        if (!promote_code) return CMessage.info('请输入优惠券码');
        this.setState({ submit_btn_disabled: true, submit_btn: '提交中' });
        const [err, res] = await fetchData(APIURL_Temp_User_Exp_Course, {
            phone,
            auth_code,
            promote_code,
        });
        this.setState({ submit_btn_disabled: false, submit_btn: '立即领取' });
        if (err) return CMessage.info(errorMsg(err));
        CMessage.success('成功领取！', () => {
            let h =
                APIURL_Auth_Auto_Signin +
                `?code=${res.code}&redirect=${encodeURIComponent('/learn')}`;
            console.log(h);
            location.href = h;
        });
    }

    render() {
        const {
            phone,
            promote_code,
            auth_code,
            auth_code_btn_disabled,
            auth_code_btn,
            submit_btn_disabled,
            submit_btn,
        } = this.state;
        return (
            <div className="exp-course">
                <div className="exp-course__banner">
                    <img className="exp-mylogo" src={require('@/asset/image/bule-bstcine-logo.png')}/>
                    <span className="divide"></span>
                    <img
                        className="exp-course__logo"
                        src={require('../asset/image/logo_yd@2x.png')}
                    />
                    {/*<div className="exp-course__city">深圳</div>*/}
                    <div className="exp-course__name">尊敬的深圳移动用户，</div>
                    <div className="exp-course__detail">
                        恭喜您获得善恩英语“英文原版精读课程精选体验合辑”大礼包
                    </div>
                </div>
                <div className="exp-course__form">

                    <div className="ec-form-control ec-form-control--promote_code">
                        <CIcon>new_releases</CIcon>
                        <input
                            placeholder="请输入兑换码"
                            value={promote_code}
                            onChange={e => {
                                this.setState({ promote_code: e.target.value });
                            }}
                        />
                    </div>

                    <div className="ec-form-control ec-form-control--phone">
                        <CIcon>smartphone</CIcon>
                        <input
                            type="tel"
                            placeholder="请输入手机号"
                            value={phone}
                            onChange={e => {
                                this.setState({ phone: e.target.value });
                            }}
                        />
                    </div>

                    <div className="ec-form-control ec-form-control--authcode">
                        <CIcon>verified_user</CIcon>
                        <input
                            className="auth_code_input"
                            type="number"
                            placeholder="请输入验证码"
                            maxLength="4"
                            value={auth_code}
                            onChange={e => {
                                this.setState({ auth_code: e.target.value });
                            }}
                        />
                        <CButton
                            className="auth_code_btn"
                            shape="capsule"
                            color="primary"
                            variant="outlined"
                            disabled={auth_code_btn_disabled}
                            onClick={this.sendAuthCode}
                        >
                            {auth_code_btn}
                        </CButton>
                    </div>



                    <CButton
                        className="ec-submit"
                        shape="capsule"
                        color="primary"
                        variant="contained"
                        disabled={submit_btn_disabled}
                        onClick={this.submit}
                    >
                        {submit_btn}
                    </CButton>
                </div>
                <div className="exp-course__ext">
                    <div className="exp-course__explain">活动说明</div>
                    <div className="exp-course__explain-detail">
                        <p className="bold">领取时间：</p>
                        <p>即日起至11月30日止</p>
                        <p className="bold">领取数量：</p>
                        <p>限领10000份，领完即止</p>
                        <p className="bold">适用范围：</p>
                        <p>本活动仅限深圳移动用户专享，非深圳移动用户无法享用。</p>
                        <p>1、  每个手机号限领一次，不可重复领取；</p>
                        <p>2、  用户输入兑换码、手机号码及接收到的手机短信验证码，即可成功领取大礼包；</p>
                        <p>3、  大礼包内课程有效期为2个月（自领取之日起），过期即止；</p>
                        <p>4、  课程相关咨询，请添加善恩客服微信号：BSTCINE02；</p>
                        <p>5、  本次活动最终解释权归属善恩英语。</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ExpCourse;

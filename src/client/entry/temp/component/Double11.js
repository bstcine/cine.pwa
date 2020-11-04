import React, { Component } from 'react';
import moment from 'moment';
import '../asset/style/double11.less';
import commonUtil from '@/util/_base/commonUtil';
import { CMessage } from '@/component/_base';
import { fetchData } from '@/service/base';
import {
    APIURL_Auth_Signup_By_Phone_And_Signin,
    APIURL_Auth_Send_VerificationCode,
    APIURL_Temp_Double11_Coupon,
} from '../../../../APIConfig';
import errorMsg from '@/util/errorMsg';
import storeUtil from '@/util/_base/storeUtil';

const PageState = {
    SubmitPage: '1',
    ResultPage: '2',
    EndPage: '3',
};

const COUPON_ABLE = '2020-11-09';
const COUPON_END = '2020-11-11';

export default class Double11 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logined: !!storeUtil.getToken(),
            page_state: moment().isSameOrBefore(COUPON_END)
                ? PageState.SubmitPage
                : PageState.EndPage,
            phone: '',
            auth_code: '',
            auth_code_btn_disabled: false,
            auth_code_btn: '发送验证码',
            is_new_register: false,
            user: null,
            today_coupon_limit: false,
        };
        this.submit_btn_disabled = false;
        this.submit = this.submit.bind(this);
        this.sendAuthCode = this.sendAuthCode.bind(this);
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
        if (this.submit_btn_disabled) return;
        const { phone, auth_code, logined } = this.state;
        if (!logined) {
            if (!commonUtil.isPhone(86, phone))
                return CMessage.info('手机格式不正确');
            if (!auth_code) return CMessage.info('请输入验证码');

            this.submit_btn_disabled = true;
            const [err] = await fetchData(
                APIURL_Auth_Signup_By_Phone_And_Signin,
                {
                    phone,
                    auth_code,
                }
            );
            if (err) {
                CMessage.info(errorMsg(err));
                this.submit_btn_disabled = false;
                return;
            }
        }

        const [err1, result] = await fetchData(APIURL_Temp_Double11_Coupon);
        if (err1) {
            if (err1 === 'today_coupon_limit') {
                this.setState({
                    today_coupon_limit: true,
                    page_state: PageState.ResultPage,
                });
            } else {
                CMessage.info(errorMsg(err1));
                this.submit_btn_disabled = false;
            }
            return;
        }
        console.log(result);
        this.setState({
            coupon: result.coupon,
            page_state: PageState.ResultPage,
        });
        this.submit_btn_disabled = false;
        CMessage.success('成功领取！');
    }

    render() {
        const {
            logined,
            page_state,
            phone,
            auth_code,
            auth_code_btn_disabled,
            auth_code_btn,
            coupon,
            today_coupon_limit,
        } = this.state;

        return (
            <div className="d11-container">
                <div className="banner" />
                {page_state === PageState.SubmitPage && (
                    <div className="d11-panel">
                        {!logined && (
                            <div className="form-group">
                                <label htmlFor="phone">
                                    请输入接收优惠券的手机号{' '}
                                    <span className="tips">
                                        （未注册手机号将自动注册）
                                    </span>
                                </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="icon icon-tel" />
                                    </div>
                                    <input
                                        className="form-control"
                                        type="tel"
                                        placeholder="请输入手机号"
                                        value={phone}
                                        onChange={e => {
                                            this.setState({
                                                phone: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {!logined && (
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="icon icon-tel" />
                                    </div>
                                    <input
                                        className="form-control"
                                        type="number"
                                        placeholder="请输入验证码"
                                        maxLength="4"
                                        value={auth_code}
                                        onChange={e => {
                                            this.setState({
                                                auth_code: e.target.value,
                                            });
                                        }}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            className="btn btn-light input-group-btn"
                                            disabled={auth_code_btn_disabled}
                                            onClick={this.sendAuthCode}
                                        >
                                            {auth_code_btn}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="center">
                            <img
                                src={require('../asset/image/d11-btn.png')}
                                alt=""
                                className="btn animate__heartBeat"
                                onClick={this.submit}
                            />
                        </div>
                    </div>
                )}

                {page_state === PageState.ResultPage && (
                    <div className="d11-panel">
                        {!today_coupon_limit && (
                            <div className="coupon-detail">
                                <div className="coupon-ticket">
                                    <div className="coupon-value">
                                        <span className="value">
                                            {coupon.value}
                                        </span>
                                        <span className="unit">元</span>
                                    </div>
                                    <div className="coupon-desc">
                                        <div className="coupon-name">
                                            {coupon.name}
                                        </div>
                                    </div>
                                    <div className="effective-date-wrap">
                                        {coupon.desc}
                                    </div>
                                </div>
                            </div>
                        )}
                        {today_coupon_limit &&
                            moment().isBefore(COUPON_END) && (
                                <div className="tomorrow">明天再来吧！</div>
                            )}
                        {today_coupon_limit &&
                            moment().isSameOrAfter(COUPON_END) && (
                                <div className="tomorrow">次数已用完</div>
                            )}

                        <div className="center">
                            {!today_coupon_limit && (
                                <img
                                    src={require('../asset/image/btn_again.png')}
                                    alt="再来一次"
                                    className="btn btn-again"
                                    onClick={() => {
                                        window.location.reload();
                                    }}
                                />
                            )}
                            {moment().isSameOrAfter(COUPON_ABLE) && (
                                <img
                                    src={require('../asset/image/btn_use_now.png')}
                                    alt="立即使用"
                                    className="btn"
                                    onClick={() => {
                                        window.location.href = '/';
                                    }}
                                />
                            )}
                        </div>
                    </div>
                )}

                {page_state === PageState.EndPage && (
                    <div className="d11-panel">
                        <div className="tomorrow">活动已结束</div>
                    </div>
                )}

                <div className="d11-panel">
                    <div className="rule-title">
                        <span>领券规则</span>
                    </div>
                    <div className="rule-detail">
                        1、点击“立即领取”后，将自动创建善恩学习账号，
                        登录密码为手机号后6位（如已注册善恩账号，则密码不变动），
                        优惠券领取成功；
                        <br />
                        2、本券适用于善恩所有视频类课程，不可叠加使用；
                        <br />
                        3、双11活动期间，每个账号每天最多可领取3张优惠券;
                        <br />
                        4、优惠券有效期：2020年11月9日-2020年11月11日；
                        <br />
                        5、其他未尽事宜，请联系善恩小助手微信号：BSTCINE02
                        <br />
                    </div>
                </div>
            </div>
        );
    }
}

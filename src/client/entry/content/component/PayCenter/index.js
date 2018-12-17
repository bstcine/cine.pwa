import React, { Component } from 'react';
import QRCode from 'qrcode';
import uaUtil from '@/util/_base/uaUtil';
import interSiteCodeUtil from '@/util/_base/interSiteCodeUtil';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import PayingModal from '@/entry/content/component/PayCenter/PayingModal';
import QRModal from '@/entry/content/component/PayCenter/QRModal';
import { addParam, getParam } from '@/util/_base/urlUtil';
import HelpModal from '@/entry/content/component/PayCenter/HelpModal';
import { fetchData } from '@/service/base';
import errorMsg from '@/util/errorMsg';
import wechatUtil from '@/util/_base/wechatUtil';
import Api from '@/../APIConfig';
import storeUtil from '@/util/_base/storeUtil';
import Bridge from '@/util/_base/interBridge';
import BRIDGE_EVENT from '@/constant/bridgeEvent';

export default class PayCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPayingModal: false,
            showQRModal: false,
            showHelpModal: false,
            order: null,
            code_url: '',
            pay_btn: {
                text: '立即支付',
                disabled: false,
            },
            pay_type: 1,
        };
        this.closePayingModal = this.closePayingModal.bind(this);
        this.closeQRModal = this.closeQRModal.bind(this);
        this.closeHelpModal = this.closeHelpModal.bind(this);
        this.choosePayType = this.choosePayType.bind(this);
        this.submitPay = this.submitPay.bind(this);
    }

    async componentDidMount() {
        document.title = '善恩英语 - 收银台';
        if (uaUtil.wechat() && getParam().redirected !== '1') {
            let url = addParam(location.href, { redirected: 1 });
            location.href =
                '//www.bstcine.com/wechat/authorize?redirect=' +
                encodeURIComponent(url);
        } else {
            try {
                wechatUtil.init();
            } catch (e) {
                console.log(e);
            }

            let cid = getParam().cid;
            fetchData(Api.APIURL_Order_Detail, { cid }).then(
                ([err, result]) => {
                    if (err) return alert(errorMsg(err));
                    let { order } = result.detail;
                    if (order.pay_status === '1') {
                        location.href = `/pay/status?cid=${order.id}`;
                        return;
                    }
                    this.setState({ order });
                }
            );
        }
    }

    closePayingModal() {
        this.setState({
            showPayingModal: false,
        });
    }

    openPayingModal() {
        this.setState({
            showPayingModal: true,
        });
    }

    closeQRModal() {
        this.setState({
            showQRModal: false,
        });
    }

    openQRModal(code_url) {
        this.setState({
            showQRModal: true,
            code_url,
        });
    }

    closeHelpModal() {
        this.setState({
            showHelpModal: false,
        });
    }

    openHelpModal() {
        this.setState({
            showHelpModal: true,
        });
    }

    choosePayType(pay_type) {
        this.setState({
            pay_type,
        });
    }

    checkingOrderStatus() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        let { order } = this.state;
        this.timer = setInterval(() => {
            fetchData(Api.APIURL_Order_Pay_Status, { cid: order.id }).then(
                ([err, result]) => {
                    if (err) {
                        return alert(errorMsg(err));
                    }
                    let { pay_status } = result;
                    if (pay_status === '1') {
                        clearInterval(this.timer);
                        location.href = `/pay/status?cid=${order.id}`;
                    }
                }
            );
        }, 3000);
    }

    goPayRedirect(url) {
        this.gopayEle.href = url;
        this.gopayEle.click();
    }

    doPayWechatJsapi() {
        const { openid } = getParam();
        let { order } = this.state;
        let _this = this;
        _this.setState({
            pay_btn: { text: '支付中...', disabled: true },
        });
        fetchData(Api.APIURL_Pay_Wechat_Jsapi, { cid: order.id, openid }).then(
            ([err, config]) => {
                if (err) console.log(err);
                this.checkingOrderStatus();
                wx.chooseWXPay({
                    timestamp: config.timeStamp,
                    nonceStr: config.nonceStr,
                    package: config.package,
                    signType: config.signType,
                    paySign: config.paySign,
                    success: function(res) {
                        _this.setState({
                            pay_btn: { text: '立即支付', disabled: false },
                        });
                    },
                    cancel: function(res) {
                        _this.setState({
                            pay_btn: { text: '重新支付', disabled: false },
                        });
                    },
                    fail: function(res) {
                        _this.setState({
                            pay_btn: { text: '重新支付', disabled: false },
                        });
                    },
                });
            }
        );
    }

    doPayWechatQrcode() {
        let { order } = this.state;
        this.setState({
            pay_btn: { text: '支付中...', disabled: true },
        });
        fetchData(Api.APIURL_Pay_Wechat_Qrcode, { cid: order.id }).then(
            ([err, result]) => {
                if (err) {
                    return alert(errorMsg(err));
                }
                this.checkingOrderStatus();
                this.setState({
                    pay_btn: { text: '重新支付', disabled: false },
                });
                let { code_url } = result;
                QRCode.toDataURL(code_url, { width: 200 })
                    .then(url => {
                        this.openQRModal(url);
                    })
                    .catch(err => {
                        alert(err);
                    });
            }
        );
    }

    doPayWechatMweb() {
        this.openPayingModal();
        this.checkingOrderStatus();
        this.goPayRedirect(
            `${Api.APIURL_Pay_Wechat_Mweb}?cid=${this.state.order.id}`
        );
    }

    doPayAliPc() {
        this.openPayingModal();
        this.checkingOrderStatus();
        this.goPayRedirect(
            `${Api.APIURL_Pay_Ali_Pc}?cid=${this.state.order.id}`
        );
    }

    doPayAliMweb() {
        this.openPayingModal();
        this.checkingOrderStatus();
        this.goPayRedirect(
            `${Api.APIURL_Pay_Ali_Mweb}?cid=${this.state.order.id}`
        );
    }

    doPayApp(pay_type) {
        const { order } = this.state;
        this.openPayingModal();
        this.checkingOrderStatus();
        Bridge.ios(BRIDGE_EVENT.APP_PAY, { order_id: order.id, pay_type });
    }

    submitPay() {
        let { pay_type } = this.state;
        if (pay_type === 1) {
            if (
                storeUtil.get('temp_h5', 'session') === '1' &&
                interSiteCodeUtil.inIOSAPP()
            ) {
                this.doPayApp('1');
            } else if (uaUtil.wechat()) {
                this.openHelpModal();
            } else if (uaUtil.mobile()) {
                // 支付宝mweb支付
                this.doPayAliMweb();
            } else {
                // 支付宝pc支付
                this.doPayAliPc();
            }
        } else if (pay_type === 3) {
            if (
                storeUtil.get('temp_h5', 'session') === '1' &&
                interSiteCodeUtil.inIOSAPP()
            ) {
                this.doPayApp('3');
            } else if (uaUtil.wechat()) {
                const { openid } = getParam();
                if (openid) {
                    // 微信jsapi支付
                    this.doPayWechatJsapi();
                } else {
                    // 微信QRcode支付
                    this.doPayWechatQrcode();
                }
            } else if (uaUtil.mobile()) {
                // 微信mweb支付
                this.doPayWechatMweb();
            } else {
                // 微信QRcode支付
                this.doPayWechatQrcode();
            }
        }
    }

    render() {
        let {
            showPayingModal,
            showQRModal,
            showHelpModal,
            order,
            pay_type,
            pay_btn,
            code_url,
        } = this.state;
        return (
            <React.Fragment>
                <Header isShow={!interSiteCodeUtil.inAPP() && !uaUtil.wechat()} />
                <div className="container-fluid course-container-bg">
                    <div className="paycenter-container">
                        <div className="pay-header">
                            <div className="pay-title">善恩-收银台</div>
                        </div>
                        <div className="pay-content">
                            <div className="orderno-title">
                                订单号{' '}
                                <span className="orderid">
                                    {order ? order.id : ''}
                                </span>
                            </div>
                            <div className="order-content">
                                <div className="order-name">
                                    {order ? order.subject : ''}
                                </div>
                                <div className="order-price">
                                    实付金额：<span className="price">
                                        {order ? order.pay_price : ''}
                                    </span>
                                </div>
                            </div>
                            <div className="pay-method">
                                <div className="pay-method-title">
                                    选择支付方式<span className="pay-method-tip">
                                        （支付宝、微信）
                                    </span>
                                </div>
                                <div className="pay-method-choose clearfix">
                                    <div
                                        className={
                                            pay_type === 1
                                                ? 'pay-method-item pay-method-alipay active'
                                                : 'pay-method-item pay-method-alipay'
                                        }
                                        onClick={() => this.choosePayType(1)}
                                    >
                                        <img
                                            src={require('../../asset/image/pic_alipay.png')}
                                            alt="支付宝支付"
                                        />
                                    </div>
                                    <div
                                        className={
                                            pay_type === 3
                                                ? 'pay-method-item pay-method-wechatpay active'
                                                : 'pay-method-item pay-method-wechatpay'
                                        }
                                        onClick={() => this.choosePayType(3)}
                                    >
                                        <img
                                            src={require('../../asset/image/pic_wechat.png')}
                                            alt="微信支付"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="pay-footer clearfix">
                                <a
                                    ref={ele => {
                                        this.gopayEle = ele;
                                    }}
                                    href=""
                                    style={{ display: 'none' }}
                                    target="payWindow"
                                />

                                <button
                                    id="payBtn"
                                    className="btn btn-danger btn-confirm"
                                    onClick={this.submitPay}
                                    disabled={pay_btn.disabled}
                                >
                                    {pay_btn.text}
                                </button>
                            </div>
                            <div className="pay-qa">
                                <div className="pay-qa-title">
                                    <span>支付遇到问题</span>
                                </div>
                                <div className="pay-qa-desc">
                                    请立即联系我们的客服，微信号：BSTCINE02
                                    进行咨询，我们将为您提供基于微信的技术支持服务。
                                </div>
                            </div>

                            <PayingModal
                                isOpen={showPayingModal}
                                onRequestClose={this.closePayingModal}
                                order_id={order ? order.id : ''}
                            />
                            <QRModal
                                isOpen={showQRModal}
                                onRequestClose={this.closeQRModal}
                                code_url={code_url}
                                pay_price={order ? order.pay_price : ''}
                            />
                            <HelpModal
                                isOpen={showHelpModal}
                                onRequestClose={this.closeHelpModal}
                            />
                        </div>
                    </div>
                </div>
                <Footer isShow={!uaUtil.mobile()} />
            </React.Fragment>
        );
    }
}

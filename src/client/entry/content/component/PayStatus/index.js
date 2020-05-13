import React, { Component } from 'react';
import { getParam } from '@/util/_base/urlUtil';
import errorMsg from '@/util/errorMsg';
import uaUtil from '@/util/_base/uaUtil';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import interSiteCodeUtil from '@/util/_base/interSiteCodeUtil';
import Api from '@/../APIConfig';
import { fetchData } from '@/service/base';
import storeUtil from '@/util/_base/storeUtil';
import Bridge from '@/util/_base/interBridge';
import BRIDGE_EVENT from '@/constant/bridgeEvent';

export default class PayStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: null,
        };
    }

    componentDidMount() {
        document.title = '订单状态';
        let cid = getParam().cid;
        fetchData(Api.APIURL_Order_Detail, { cid }).then(([err, result]) => {
            if (err) return alert(errorMsg(err));
            let { order } = result.detail;
            if (
                order.status === '1' &&
                interSiteCodeUtil.inIOSAPP() &&
                storeUtil.get('temp_h5')
            ) {
                Bridge.ios(BRIDGE_EVENT.ORDER_PAY_SUCCESS, {
                    order_id: order.id,
                });
            }
            this.setState({ order });
        });
    }

    renderPayingStatus() {
        let { order } = this.state;
        return (
            <div className="order-panel order-waiting">
                <div className="order-panel-title">
                    <img
                        src={require('../../asset/image/ico_waiting.png')}
                        alt="等待支付"
                        className="order-icon"
                    />等待支付
                </div>
                <div className="order-panel-desc">
                    <p>
                        您所订购的{order.subject}还未支付，如您已经支付成功，请稍候刷新本页面重试
                    </p>
                    <p>
                        订单号：<span className="red">{order.id}</span>
                    </p>
                </div>
            </div>
        );
    }

    renderPayedStatus() {
        let { order } = this.state;
        return (
            <div className="order-panel order-success">
                <div className="order-panel-title">
                    <img
                        src={require('../../asset/image/ico_success.png')}
                        alt="支付成功"
                        className="order-icon"
                    />支付成功！
                </div>
                <div className="order-panel-desc">
                    <p>课程名称：{order.subject}</p>
                    <p>
                        订单号：<span className="red">{order.id}</span>
                    </p>
                    <p>
                        推荐学习方式：电脑登录{' '}
                        <a href="/learn">www.bstcine.com/learn</a> 进行学习
                    </p>
                    <p className="tips">
                        如需咨询，请加善恩小助手微信（<span className="wechat-name">
                            BSTCINE02
                        </span>）好友
                    </p>
                </div>
            </div>
        );
    }

    renderCanceledPayStatus() {
        let { order } = this.state;
        return (
            <div className="order-panel order-cancel">
                <div className="order-panel-title">
                    <img
                        src={require('../../asset/image/ico_cancel.png')}
                        alt="已取消支付"
                        className="order-icon"
                    />已取消支付
                </div>
                <div className="order-panel-desc">
                    <p>
                        订单号：<span className="red">{order.id}</span> 已取消
                    </p>
                </div>
            </div>
        );
    }

    renderPayStatus() {
        let { order } = this.state;
        if (!order) return;
        if (order.pay_status === '0' || order.pay_status === '3') {
            return this.renderPayingStatus();
        } else if (order.pay_status === '1') {
            return this.renderPayedStatus();
        } else if (order.pay_status === '4') {
            return this.renderCanceledPayStatus();
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header isShow={!interSiteCodeUtil.inAPP() && !uaUtil.wechat()} />
                <div className="container-fluid course-container-bg">
                    <div className="paystatus-container">
                        <div className="pay-header">
                            <div className="pay-title">善恩-订单状态</div>
                        </div>
                        <div className="pay-content">
                            {this.renderPayStatus()}
                        </div>
                    </div>
                </div>
                <Footer isShow={!uaUtil.mobile()} />
            </React.Fragment>
        );
    }
}

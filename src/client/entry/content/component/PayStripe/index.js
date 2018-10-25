import React, { Component } from 'react';
import loadScript from '@/util/loadScript';
import { fetchData } from '@/service/base';
import { APIURL_Pay_Stripe_Info } from '../../../../../APIConfig';
import { CMessage } from '@/component/_base';
import Header from '@/component/Header';
import siteCodeUtil from '@/util/sitecodeUtil';
import uaUtil from '@/util/uaUtil';
import Footer from '@/component/Footer';
import { getParam } from '@/util/urlUtil';
import Icon from '@/component/_base/Icon';

class PayStripe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            order: null,
        };
    }

    componentDidMount() {
        if (
            location.protocol === 'https:' ||
            location.hostname === 'localhost'
        ) {
            fetchData(APIURL_Pay_Stripe_Info, {
                order_id: getParam().cid,
            }).then(([error, result]) => {
                if (error) return CMessage.error(error);
                const { keyPublic, order } = result;
                if (order.pay_status === '1') {
                    location.href = `/pay/status?cid=${order.id}`;
                }
                this.setState({
                    order,
                });
                this.initStripe(keyPublic);
            });
        } else {
            location.href = location.href.replace('http://', 'https://');
        }
    }

    initStripe(keyPublic) {
        loadScript('https://js.stripe.com/v3/').then(() => {
            // Create a Stripe client.
            let stripe = window.Stripe(keyPublic);

            // Create an instance of Elements.
            let elements = stripe.elements();

            // Custom styling can be passed to options when creating an Element.
            // (Note that this demo uses a wider set of styles than the guide below.)
            let style = {
                base: {
                    color: '#32325d',
                    lineHeight: '18px',
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSmoothing: 'antialiased',
                    fontSize: '16px',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                },
                invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a',
                },
            };

            // Create an instance of the card Element.
            let card = elements.create('card', { style: style });

            // Add an instance of the card Element into the `card-element` <div>.
            card.mount('#card-element');

            // Handle real-time validation errors from the card Element.
            card.addEventListener('change', function(event) {
                let displayError = document.getElementById('card-errors');
                if (event.error) {
                    displayError.textContent = event.error.message;
                } else {
                    displayError.textContent = '';
                }
                if (btn.disabled) {
                    btn.disabled = false;
                }
            });

            let btn = document.getElementById('payBtn');
            // Handle form submission.
            let form = document.getElementById('payment-form');
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                btn.disabled = true;
                stripe.createToken(card).then(function(result) {
                    if (result.error) {
                        // Inform the user if there was an error.
                        let errorElement = document.getElementById(
                            'card-errors'
                        );
                        errorElement.textContent = result.error.message;
                    } else {
                        // Send the token to your server.
                        stripeTokenHandler(result.token);
                    }
                });
            });

            function stripeTokenHandler(token) {
                // Insert the token ID into the form so it gets submitted to the server
                let form = document.getElementById('payment-form');
                let hiddenInput = document.createElement('input');
                hiddenInput.setAttribute('type', 'hidden');
                hiddenInput.setAttribute('name', 'stripeToken');
                hiddenInput.setAttribute('value', token.id);
                form.appendChild(hiddenInput);

                // Submit the form
                form.submit();
            }
        });
    }
    render() {
        const { order } = this.state;
        return (
            <React.Fragment>
                <Header isShow={!siteCodeUtil.inAPP() && !uaUtil.wechat()} />
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
                                        ${order ? order.pay_price : ''}
                                    </span>
                                </div>
                            </div>
                            <form
                                action="/api/pay/stripe"
                                method="post"
                                id="payment-form"
                            >
                                <div className="pay-method">
                                    <div className="pay-method-safe">
                                        <span className="blue">
                                            <Icon>ci-safe</Icon>安全支付
                                        </span>
                                        <span>
                                            所有信用卡信息已获得安全的加密保护
                                        </span>
                                    </div>
                                    <div className="pay-method-title">
                                        支付方式
                                    </div>
                                    {order && (
                                        <input
                                            type="hidden"
                                            name="order_id"
                                            hidden
                                            value={order.id}
                                        />
                                    )}
                                    {order && (
                                        <input
                                            type="hidden"
                                            name="amount"
                                            hidden
                                            value={order.pay_price * 100}
                                        />
                                    )}
                                    <div className="form-row">
                                        <div id="card-element" />

                                        <div id="card-errors" role="alert" />
                                    </div>
                                </div>
                                <div className="pay-footer clearfix">
                                    <button
                                        id="payBtn"
                                        className="btn btn-danger btn-confirm"
                                        onClick={this.submitPay}
                                    >
                                        立即支付
                                    </button>
                                </div>
                            </form>
                            <div className="pay-qa">
                                <div className="pay-qa-title">
                                    <span>支付遇到问题？</span>
                                </div>
                                <div className="pay-qa-desc">
                                    请立即联系我们的客服，微信号：BSTCINE01
                                    进行咨询，我们将为您提供基于微信的技术支持服务。
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer isShow={!uaUtil.mobile()} />
            </React.Fragment>
        );
    }
}

export default PayStripe;

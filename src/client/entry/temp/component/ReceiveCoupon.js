/**
 * Created by lidangkun on 2018/7/24.
 */
import React, { Component } from 'react';
import Api from '../../../../APIConfig';
import { fetchData } from '@/service/base';
import Header from '../../../component/Header';
import Footer from '../../../component/Footer';
import '../asset/style/ReceiveCoupon.less';
import storeUtil from '@/util/_base/storeUtil';
import LoginModal from '@/component/LoginModal';

export default class ReceiveCoupon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginModalShow: false,
        };
        this.endTime = '2018/07/31 23:59:59';
        this.coupon = {
            value: 50,
            type: '1',
            object_type: '1',
            condition: '1',
            name: '视频课程通用优惠券',
            desc: '本券仅限购买一门课程，不设找零，不可合并;',
            remark: 'JJ书展专享;',
            create_by: 'd011499175389972J0QEkPd6An',
        };
    }
    async receiveHandle() {
        if (!storeUtil.getToken()) {
            this.setState({ isLoginModalShow: true });
        } else {
            let [err, result] = await fetchData(
                Api.APIURL_Temp_User_Coupon_Receive,
                this.coupon
            );
            if (!err && result && result.status === true) {
                location.href = '/user/coupon';
            }
        }
    }
    render() {
        // 判断是否是可用时间
        const currentTime = new Date();
        const endTime = new Date(this.endTime);
        if (currentTime > endTime) {
            return <p>该功能已过期</p>;
        }
        let { value, type, name } = this.coupon;
        let couponValue = 0;
        let couponType = '';
        if (type === 1 || type === '1') {
            couponValue = value;
            couponType = '元';
        } else if (type === 2 || type === '2') {
            couponValue = 100 - parseInt(value * 100, 10);
            couponType = '折';
        }
        return (
            <React.Fragment>
                <Header isShow={true} />
                <div className="receiveContent">
                    <div className="couponContent">
                        <div className="couponHeader">
                            <p className="couponValue">{couponValue}</p>
                            <p className="couponType">{couponType}</p>
                            <p className="couponName">{name}</p>
                        </div>
                        <div
                            className="receiveButton"
                            onClick={() => this.receiveHandle()}
                        >
                            <p className="receiveText">点击领取</p>
                        </div>
                    </div>
                    <div className="promoteContent">
                        <p className="promoteHeader">优惠券使用说明</p>
                        <p className="promoteBody">
                            1. 本券仅限729原版少儿童书展用户领取；
                            <br />
                            2. 领取链接7月31日24点前有效；
                            <br />
                            3. 本券可用于购买善恩官网上所有视频课程；
                            <br />
                            4. 本券仅限购买一门课程，不设找零，不可合并；
                            <br />
                            5. 本券自领取之日起生效，一个月内有效。
                        </p>
                    </div>
                </div>
                <LoginModal
                    isOpen={this.state.isLoginModalShow}
                    onLoginSuccess={() => {
                        this.setState({ isLoginModalShow: false });
                    }}
                    toggleModal={() => {
                        this.setState({ isLoginModalShow: false });
                    }}
                />
                <Footer isShow={true} />
            </React.Fragment>
        );
    }
}

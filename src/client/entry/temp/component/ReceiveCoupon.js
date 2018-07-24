/**
 * Created by lidangkun on 2018/7/24.
 */
import React, { Component } from 'react';
import Api from '../../../../APIConfig';
import { fetchData } from '@/service/base';
import Header from '../../../component/Header';
import Footer from '../../../component/Footer';
import '../asset/style/ReceiveCoupon.less';
import storeUtil from '@/util/storeUtil';
import LoginModal from '@/component/LoginModal';

export default class ReceiveCoupon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginModalShow: false,
        }
        this.coupon = {
            value: 50,
            type: '1',
            object_type: '1',
            condition: '1',
            name: '视频课程通用优惠券(JJ书展专享)',
        };
    }
    async receiveHandle() {
        if (!storeUtil.getToken()) {
            this.setState({ isLoginModalShow: true });
        } else {
            let [err, result] = await fetchData(Api.APIURL_Temp_User_Coupon_Receive, this.coupon);
            if (!err && result && result.status === true) {
                location.href = '/user/coupon';
            }
        }
    }
    render() {
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
                <Header isShow={true}/>
                <div className="receiveContent">
                    <div className="couponContent">
                        <div className="couponHeader">
                            <p className="couponValue">{couponValue}</p>
                            <p className="couponType">{couponType}</p>
                            <p className="couponName">{name}</p>
                        </div>
                        <div className="receiveButton" onClick={() => this.receiveHandle()}>
                            <p className="receiveText">点击领取</p>
                        </div>
                    </div>
                    <div className="promoteContent">
                        <p className="promoteHeader">
                            优惠券使用说明
                        </p>
                        <p className="promoteBody">
                            1. 本券有效期为一个月，可多次领取。<br/>
                            2. 本券可用于购买善恩英语所有视频类课程，每个优惠券码仅限购买一套课程。<br/>
                            3. 新客户首次下单24小时内可使用多个优惠券码购买多套课程。<br/>
                            4.在下单页面中“优惠券”一栏输入优惠券码，点击“使用”即可享受优惠。<br/>
                            5. 本券使用的最终解释权归善恩英语所有。<br/>
                        </p>
                    </div>
                </div>
                <LoginModal
                    isOpen={this.state.isLoginModalShow}
                    onLoginSuccess={() => {
                        this.setState({ isLoginModalShow: false });
                    }}
                />
                <Footer isShow={true}/>
            </React.Fragment>
        );
    }
}
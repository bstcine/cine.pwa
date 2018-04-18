import React, {Component} from 'react';

export default class Coupon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {coupon,actions} = this.props;

        let value = coupon.type === "1" ? coupon.value : 100 - Number(coupon.value) * 100;
        let unit = coupon.type === "1" ? "元" : "折";

        let couponStyle = "coupon-ticket";
        if (coupon.status === "1") {
            couponStyle = "coupon-ticket-used";
        } else if (coupon.status === "2") {
            couponStyle = "coupon-ticket-expired";
        }

        return (
            <div className={couponStyle}>
                <div className="coupon-value">
                    <span className="value">{value}</span>
                    <span className="unit">{unit}</span>
                </div>
                <div className="coupon-desc">
                    <div className="coupon-name" onClick={() => actions.expandCoupon(coupon.id)}>{coupon.name}</div>
                    <div className="coupon-no">优惠券码：{coupon.no}</div>
                </div>
                <div className="effective-date">
                    有效期：{coupon.effective_at.substring(0, 10).replace(/-/g, '.')} -{' '}
                    {coupon.expire_at.substring(0, 10).replace(/-/g, '.')}
                </div>
                {coupon.status === "1" && <img src={require("../asset/image/ic_coupon_used.png")}/>}
            </div>
        );
    }
}

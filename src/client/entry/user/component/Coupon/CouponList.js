import React, {Component} from 'react';
import Coupon from './Coupon';

export default class CouponList extends Component {
    constructor(props) {
        super(props);
    }

    renderCoupons() {
        let {coupons, ...props} = this.props;
        if (coupons && coupons.length) {
            return coupons.map((coupon, i) => {
                return <Coupon key={i} coupon={coupon} {...props} />;
            });
        } else {
            return (
                <div className="coupon-not-found">
                    暂无数据
                </div>
            );
        }
    }

    render() {
        return <div className="coupon-list">{this.renderCoupons()}</div>;
    }
}

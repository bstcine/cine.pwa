import React from 'react';
import Coupon from './Coupon';

const CouponList = ({ coupons, ...props }) => {
    let renderCoupons;
    if (coupons && coupons.length) {
        renderCoupons = coupons.map((coupon, i) => {
            return <Coupon key={i} coupon={coupon} {...props} />;
        });
    } else {
        renderCoupons = <div className="coupon-not-found">暂无数据</div>;
    }

    return <div className="coupon-list">{renderCoupons}</div>;
};

export default CouponList;

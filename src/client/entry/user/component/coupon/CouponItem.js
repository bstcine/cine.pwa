import React from 'react';

function formatCouponName(value) {
    const v = ((100 - Number(value * 100)) / 10).toFixed(1);
    if (v.split('.')[1] === '0') {
        return v[0];
    } else {
        return v;
    }
}

const CouponItem = ({ coupon, actions }) => {
    console.log(coupon);
    let value =
        coupon.type === '1' ? coupon.value : formatCouponName(coupon.value);
    let unit = coupon.type === '1' ? '元' : '折';

    let couponStyle;
    let couponStatusShow = false;
    let usedImgSrc;
    if (coupon.status === '0') {
        couponStyle = 'coupon-ticket';
        if (coupon.sub_status === -1) {
            couponStatusShow = true;
            usedImgSrc = require('../../asset/image/ic_coupon_transfer.png');
        } else if (coupon.sub_status === -2) {
            couponStatusShow = true;
            usedImgSrc = require('../../asset/image/ic_coupon_synthesizer.png');
        }
    } else if (coupon.status === '1') {
        couponStyle = 'coupon-ticket coupon-ticket-used';
        couponStatusShow = true;
        usedImgSrc = require('../../asset/image/ic_coupon_used.png');
        if (coupon.sub_status === 1) {
            usedImgSrc = require('../../asset/image/ic_coupon_transfered.png');
        } else if (coupon.sub_status === 2) {
            usedImgSrc = require('../../asset/image/ic_coupon_synthesizered.png');
        }
    } else if (coupon.status === '2') {
        couponStyle = 'coupon-ticket coupon-ticket-expired';
    }

    let arrImgSrc = coupon.expand
        ? require('../../asset/image/ico_arr_coup_up.png')
        : require('../../asset/image/ico_arr_used_down.png');

    return (
        <div className={'coupon-detail'}>
            <div className={couponStyle}>
                <div className="coupon-value">
                    <span className="value">{value}</span>
                    <span className="unit">{unit}</span>
                </div>
                <div className="coupon-desc">
                    <div className="coupon-name">{coupon.name}</div>
                    <div className="coupon-no">优惠券码：{coupon.no}</div>
                </div>
                <div className="effective-date">
                    有效期：
                    {coupon.effective_at
                        .substring(0, 10)
                        .replace(/-/g, '.')} -{' '}
                    {coupon.expire_at.substring(0, 10).replace(/-/g, '.')}
                </div>
                {coupon.desc && (
                    <img
                        className="coupon-expand"
                        src={arrImgSrc}
                        onClick={() => actions.expandCouponItem(coupon.id)}
                    />
                )}
                {couponStatusShow && (
                    <img
                        className="coupon-status"
                        disabled={true}
                        src={usedImgSrc}
                    />
                )}
                {coupon.status === '0' && (
                    <a
                        className="verb"
                        onClick={() => {
                            actions.initTransferDialog(coupon);
                        }}
                    >
                        转赠
                    </a>
                )}
            </div>
            {coupon.desc && coupon.expand && (
                <div className={'coupon-remark'}>{coupon.desc}</div>
            )}
        </div>
    );
};

export default CouponItem;

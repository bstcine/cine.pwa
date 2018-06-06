import React from 'react';

const CouponItem = ({ coupon, actions }) => {
    let value =
        coupon.type === '1' ? coupon.value : 100 - Number(coupon.value) * 100;
    let unit = coupon.type === '1' ? '元' : '折';

    var couponStyle;
    var couponStatusShow;
    var usedImgSrc;
    if (coupon.status === '0') {
        couponStyle = 'coupon-ticket';
        couponStatusShow = true;

        if (coupon.sub_status == '0'){
            couponStatusShow = false;
        }else if (coupon.sub_status == '1'){
            usedImgSrc = require('../../asset/image/ic_coupon_transfer.png');
        }else if (coupon.sub_status == '2') {
            usedImgSrc = require('../../asset/image/ic_coupon_synthesizer.png')
        }
    }else if (coupon.status === '1') {
        couponStyle = 'coupon-ticket coupon-ticket-used';
        couponStatusShow = true;
        if (coupon.sub_status == '0') {
            usedImgSrc = require('../../asset/image/ic_coupon_used.png');
        }else if (coupon.sub_status == '1'){
            usedImgSrc = require('../../asset/image/ic_coupon_transfered.png');
        }else if (coupon.sub_status == '2') {
            usedImgSrc = require('../../asset/image/ic_coupon_synthesizered.png')
        }
    } else if (coupon.status === '2') {
        couponStyle = 'coupon-ticket coupon-ticket-expired';
        couponStatusShow = false
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
                    有效期：{coupon.effective_at
                        .substring(0, 10)
                        .replace(/-/g, '.')}{' '}
                    - {coupon.expire_at.substring(0, 10).replace(/-/g, '.')}
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
                    <div className="verb" onClick={() => {actions.initTransferDialog(coupon)}}>转赠</div>
                )}
            </div>
            {coupon.desc &&
                coupon.expand && (
                <div className={'coupon-remark'}>{coupon.desc}</div>
            )}
        </div>
    );
};

export default CouponItem;

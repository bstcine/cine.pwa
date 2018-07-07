import React from 'react';
import { CFlatButton, CDialog, CTextField } from '@/component/_base';

const DialogCouponAdd = ({ isOpen, coupons, actions }) => {
    let couponNo = '';

    const dialogActions = [
        <CFlatButton
            key={1}
            label="取消"
            primary={true}
            onClick={actions.toggleCouponDialog}
        />,
        <CFlatButton
            key={2}
            label="确认"
            primary={true}
            onClick={() => {
                actions.addCoupon(couponNo);
            }}
        />,
    ];

    return (
        <CDialog
            title="添加优惠券"
            modal={false}
            actions={dialogActions}
            open={isOpen}
            onRequestClose={actions.toggleCouponDialog}>
            <CTextField
                fullWidth={true}
                onChange={(e, val) => {
                    couponNo = val;
                }}
                defaultValue={couponNo}
                hintText="请输入您的优惠券"
            />
        </CDialog>
    );
};

export default DialogCouponAdd;

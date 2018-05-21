/**
 * Created on 5/2/18.
 */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'material-ui';
import CouponTabs from '../coupon/CouponTabs';

const CouponPanel = ({ isOpen, coupons, actions }) => {
    let couponNo = '';

    const dialogActions = [
        <FlatButton
            key={1}
            label="取消"
            primary={true}
            onClick={actions.dialogAddCoupon}
        />,
        <FlatButton
            key={2}
            label="确认"
            primary={true}
            onClick={() => {
                actions.addCoupon(couponNo);
            }}
        />,
    ];
    return (
        <React.Fragment>
            <CouponTabs coupons={coupons} actions={actions} />
            <div className={'coupon-todo'}>
                <a
                    className="float-button"
                    onClick={() => {
                        actions.dialogAddCoupon();
                    }}
                />
            </div>
            <Dialog
                title="添加优惠券"
                modal={false}
                actions={dialogActions}
                open={isOpen}
                onRequestClose={actions.dialogAddCoupon}>
                <TextField
                    fullWidth={true}
                    onChange={(e, val) => {
                        couponNo = val;
                    }}
                    defaultValue={couponNo}
                    hintText="请输入您的优惠券"
                />
            </Dialog>
        </React.Fragment>
    );
};

export default CouponPanel;

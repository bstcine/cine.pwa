import React from 'react';
import { CFlatButton, CDialog, CTextField } from '@/component';

const CouponTransfer = ({ isOpen, coupon, actions }) => {
    let userAccount = '';

    const dialogActions = [
        <CFlatButton
            key={1}
            label="取消"
            primary={true}
            onClick={actions.toggleCouponTransfer}
        />,
        <CFlatButton
            key={2}
            label="确认"
            primary={true}
            onClick={() => {
                actions.transferCoupon(userAccount);
            }}
        />,
    ];
    return (
        <React.Fragment>
            <CDialog
                title="添加转让用户手机或账号"
                modal={false}
                actions={dialogActions}
                open={isOpen}
                onRequestClose={actions.toggleCouponTransfer}>
                <CTextField
                    fullWidth={true}
                    onChange={(e, val) => {
                        userAccount = val;
                    }}
                    defaultValue={userAccount}
                    hintText="请输入手机或账号"
                />
            </CDialog>
        </React.Fragment>
    );
};

export default CouponTransfer;

import React from 'react';
import { CFlatButton, CDialog, CTextField } from '@/component/_base';

const CouponTransfer = ({
    isOpen,
    isCheck,
    checkMessage,
    userAccount,
    coupon,
    actions,
}) => {
    // let userAccount = userAccount;

    const selectText = isCheck ? '检查' : '确定';
    const selectAction = () => actions.toggleTransferCheckStatus(userAccount);
    const transerAction = () => actions.transferCoupon(userAccount);

    const dialogActions = [
        <CFlatButton
            key={1}
            label="取消"
            primary={true}
            onClick={actions.toggleTransferDialog}
        />,
        <CFlatButton
            key={2}
            label={selectText}
            primary={true}
            onClick={isCheck ? selectAction : transerAction}
        />,
    ];

    let couponValue = '';

    if (coupon) {
        let value =
            coupon.type === '1'
                ? coupon.value
                : 100 - Number(coupon.value) * 100;
        let unit = coupon.type === '1' ? '元' : '折';
        couponValue = value + unit;
    }

    let couponSyle = {
        marginBottom: '0.2rem',
    };
    let nameStyle = {
        color: 'black',
        fontsize: '0.5rem',
    };
    let valueStyle = {
        color: '#fc5c63',
        paddingLeft: '1rem',
        fontsize: '0.5rem',
    };
    const couponInfo = (
        <div style={couponSyle}>
            <span style={nameStyle}>{!coupon ? '' : coupon.name}</span>
            <span style={valueStyle}>价值：{couponValue}</span>
        </div>
    );
    let checkStyle = {
        color: '#fc5c63',
        marginTop: '0.5rem',
        lineHeight: '0.5rem',
    };
    let checkPromote = '';
    if (!isCheck) {
        checkPromote = '如确认无误，请点击"确定"按钮';
    }
    const checkInfo = checkMessage !== '' && checkMessage !== undefined && (
        <div style={checkStyle}>
            <p>
                {checkMessage}
                <br />
                {checkPromote}
            </p>
        </div>
    );

    return (
        <React.Fragment>
            <CDialog
                title="优惠券转赠"
                modal={false}
                actions={dialogActions}
                open={isOpen}
                onRequestClose={actions.toggleTransferDialog}
            >
                {couponInfo}

                <CTextField
                    fullWidth={true}
                    onChange={(e, val) => {
                        userAccount = val;
                        if (!isCheck) {
                            actions.toggleTransferCheck(true, '');
                        }
                    }}
                    defaultValue={userAccount}
                    hintText="请输入对方用户账号"
                />

                {checkInfo}
            </CDialog>
        </React.Fragment>
    );
};

export default CouponTransfer;

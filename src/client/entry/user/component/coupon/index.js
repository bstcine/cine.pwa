/**
 * Created on 5/2/18.
 */
import React from 'react';
import CouponTabs from '../coupon/CouponTabs';
import DialogCouponAdd from '../coupon/DialogCouponAdd';
import DialogCouponTransfer from '../coupon/DialogCouponTransfer';
import { CFloatingBox, CIconButton } from '@/component/_base';

export default class CouponPanel extends React.PureComponent {
    render() {
        let { isOpenAdd, transfer, coupons, actions } = this.props;

        return (
            <React.Fragment>
                <CouponTabs coupons={coupons} actions={actions} />

                <CFloatingBox>
                    <CIconButton onClick={actions.toggleCouponDialog}>
                        add
                    </CIconButton>
                </CFloatingBox>

                <DialogCouponAdd isOpen={isOpenAdd} actions={actions} />

                <DialogCouponTransfer
                    isOpen={transfer.isOpen}
                    isCheck={transfer.isCheck}
                    checkMessage={transfer.checkMessage}
                    userAccount={transfer.userAccount}
                    coupon={transfer.coupon}
                    actions={actions}
                />
            </React.Fragment>
        );
    }
}

/**
 * Created on 5/2/18.
 */
import React from 'react';
import CouponTabs from '../coupon/CouponTabs';
import DialogCouponAdd from '../coupon/DialogCouponAdd';
import DialogCouponTransfer from '../coupon/DialogCouponTransfer';

export default class CouponPanel extends React.PureComponent {
    render() {
        let { isOpenAdd, transfer, coupons, actions } = this.props;

        return (
            <React.Fragment>
                <CouponTabs coupons={coupons} actions={actions} />

                <div className={'coupon-todo'}>
                    <a
                        className="float-button"
                        onClick={actions.toggleCouponDialog}
                    />
                </div>

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

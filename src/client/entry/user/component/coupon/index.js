/**
 * Created on 5/2/18.
 */
import React from 'react';
import CouponTabs from '../coupon/CouponTabs';
import DialogCouponAdd from '../coupon/DialogCouponAdd';

const CouponPanel = ({ isOpen, coupons, actions }) => {
    return (
        <React.Fragment>
            <CouponTabs coupons={coupons} actions={actions} />
            <div className={'coupon-todo'}>
                <a
                    className="float-button"
                    onClick={actions.toggleCouponDialog}
                />
            </div>
            <DialogCouponAdd isOpen={isOpen} actions={actions} />
        </React.Fragment>
    );
};

export default CouponPanel;

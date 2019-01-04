import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionUserCoupon } from '@/action/uCouponAction';
import CouponPanel from '@/entry/user/component/coupon';
import { GLayoutContainer } from "@/g/container";

class CouponContainer extends Component {
    componentDidMount() {
        this.props.actions.loadUserCoupon();
    }

    render() {
        let { coupons, isOpenAdd, transfer, actions } = this.props;

        return (
            <GLayoutContainer>
                <CouponPanel
                    isOpenAdd={isOpenAdd}
                    transfer={transfer}
                    coupons={coupons}
                    actions={actions}
                />
            </GLayoutContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        coupons: state.couponRedu.get('rows'),
        isOpenAdd: state.couponRedu.get('isOpenAdd'),
        transfer: state.couponRedu.get('transfer'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionUserCoupon, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CouponContainer);

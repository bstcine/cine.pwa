import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionUserCoupon } from '@/action/uCouponAction';
import { Toast } from '@/component/Toast';
import CouponPanel from '@/entry/user/component/coupon';

class CouponContainer extends Component {
    componentDidMount() {
        this.props.actions.loadUserCoupon();
    }

    render() {
        let { coupons, network, isOpen, actions } = this.props;

        return (
            <React.Fragment>
                <Toast network={network} />
                <CouponPanel
                    isOpen={isOpen}
                    coupons={coupons}
                    actions={actions}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        coupons: state.couponRedu.get('rows'),
        isOpen: state.couponRedu.get('isOpen'),
        network: state.toastRedu,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionUserCoupon, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CouponContainer);

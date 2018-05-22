import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionUserCoupon } from '@/action/uCouponAction';
import { ToastError, ToastLoading, ToastSuccess } from '@/component/Toast';
import CouponPanel from '@/entry/user/component/coupon';

class CouponContainer extends Component {
    componentDidMount() {
        this.props.actions.loadUserCoupon();
    }

    render() {
        let { coupons, network, isOpen, actions } = this.props;

        return (
            <React.Fragment>
                <ToastLoading show={network.loading} />
                <ToastError
                    show={!network.loading && network.error}
                    text={network.error}
                />
                <ToastSuccess
                    show={!network.loading && !network.error && network.msg}
                    text={network.msg}
                />
                <CouponPanel isOpen={isOpen} coupons={coupons} actions={actions} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        coupons: state.couponRedu.get('rows'),
        network: state.couponRedu.get('network'),
        isOpen: state.couponRedu.get('isOpen'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionUserCoupon, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CouponContainer);

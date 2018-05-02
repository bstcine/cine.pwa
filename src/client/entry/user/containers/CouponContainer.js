import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionUserCoupon } from '@/action/userAction';
import { ToastError, ToastLoading, ToastSuccess } from '@/component/Toast';
import CouponPanel from '@/entry/user/component/coupon';

class CouponContainer extends Component {
    componentDidMount() {
        this.props.actions.loadUserCoupon();
    }

    render() {
        let { coupons, actions } = this.props;

        let rows = coupons.rows;
        let network = coupons.network;
        let isOpen = coupons.isOpen;

        let use = rows && rows.filter(item => item.status === '0');
        let used = rows && rows.filter(item => item.status === '1');
        let expired = rows && rows.filter(item => item.status === '2');

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
                <CouponPanel
                    isOpen={isOpen}
                    use={use}
                    used={used}
                    expired={expired}
                    actions={actions}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    coupons: state.coupons,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionUserCoupon, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CouponContainer);

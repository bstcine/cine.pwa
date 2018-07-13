import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionUserOrder } from '@/action/uOrderAction';
import Order from '@/entry/user/component/order';

class OrderContainer extends Component {
    componentDidMount() {
        // this.props.actions.loadUserCoupon();
    }

    render() {
        let { orders, isOpenDetail, actions } = this.props;
        return (
            <React.Fragment>
                <Order
                    isOpenDetail={isOpenDetail}
                    orders={orders}
                    actions={actions}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orderRedu.get('orders'),
        isOpenAdd: state.orderRedu.get('isOpenDetail'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionUserOrder, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderContainer);

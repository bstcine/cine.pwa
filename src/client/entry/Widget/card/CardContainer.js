import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import gAction from '@/g/action';
import CardDemo from './component';

class OrderContainer extends Component {
    componentDidMount() {
        // this.props.actions.loadUserCoupon();
    }

    render() {
        let { orders, isOpenDetail, actions } = this.props;
        return (
            <React.Fragment>
                <CardDemo
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
        orders: state.cardRedu.get('orders'),
        isOpenAdd: state.cardRedu.get('isOpenDetail'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(gAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderContainer);
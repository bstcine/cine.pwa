import React from 'react';
import '../../asset/style/order.less';
import { CPanel } from '@/component/_base';
import OrderList from './OrderList';

export default class Order extends React.PureComponent {
    render() {
        const { orders } = this.props;
        const orderlist = orders.toJS();
        alert('React.PureComponent');
        alert(JSON.stringify(orders));
        return (
            <React.Fragment>
                <CPanel />
                <OrderList orders={orderlist} layout="111" className="bggrid" />

                <CPanel title="Gird Card 234" className="bgpanel">
                    <OrderList
                        orders={orderlist}
                        layout="234"
                        className="bggrid"
                    />
                </CPanel>
            </React.Fragment>
        );
    }
}

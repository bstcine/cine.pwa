import React from 'react';
import '../../asset/style/order.less';
import { CPanel } from '@/component/_base';
import OrderList from './OrderList';

export default class Order extends React.PureComponent {
    render() {
        const { orders } = this.props;
        const orderlist = orders.toJS();
        alert(JSON.stringify(orders));
        return (
            <React.Fragment>
                <CPanel title="Gird Card 234" className="bgpanel">
                    <OrderList
                        orders={orderlist}
                        layout="234"
                        className="bggrid"
                        itemClassName="bg234"
                    />
                </CPanel>

                <OrderList
                    orders={orderlist}
                    layout="234"
                    className="bggrid"
                    itemClassName="bg234"
                />

                <CPanel />

                <OrderList
                    orders={orderlist}
                    layout="123"
                    className="bgpanel"
                    itemClassName="bg123"
                />
            </React.Fragment>
        );
    }
}

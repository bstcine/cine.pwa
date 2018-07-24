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
                <OrderList
                    orders={orderlist}
                    layout="234"
                    className="bg234"
                    itemClassName="cbg234"
                />

                <br />
                <br />
                <br />

                <CPanel title="Gird Card 234" className="bgpanel">
                    <OrderList
                        orders={orderlist}
                        layout="234"
                        className="bgt"
                        itemClassName="cbg234"
                    />
                </CPanel>

                <OrderList
                    orders={orderlist}
                    layout="123"
                    className="bgt"
                    itemClassName="cbg123"
                />
            </React.Fragment>
        );
    }
}

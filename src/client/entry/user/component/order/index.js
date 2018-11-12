import React from 'react';
import '../../asset/style/order.less';
import { CPanel } from '@/component/_base';
import OrderList from './OrderList';

export default class Order extends React.PureComponent {
    render() {
        const { orders } = this.props;
        const orderlist = orders.toJS();
        // alert(JSON.stringify(orders));
        return (
            <React.Fragment>
                <CPanel title="Card 111" className="bgw">
                    <OrderList
                        orders={orderlist}
                        layout="111"
                        className="bglight"
                        itemClassName="bgw"
                    />
                </CPanel>

                <br />
                <br />
                <br />
                <br />
                <br />

                <OrderList
                    orders={orderlist}
                    layout="112"
                />

                <br />
                <br />
                <br />
                <br />
                <br />

                <OrderList
                    orders={orderlist}
                    layout="123"
                    className="bgt"
                    itemClassName="cbg123"
                />

                <br />
                <br />
                <br />
                <br />
                <br />

                <OrderList
                    orders={orderlist}
                    layout="234"
                    className="bg234"
                    itemClassName="cbg234"
                />
            </React.Fragment>
        );
    }
}

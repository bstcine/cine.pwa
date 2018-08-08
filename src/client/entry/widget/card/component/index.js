import React from 'react';
import './../../asset/style/card.less';
import { CPanel } from '@/component/_base';
import OrderList from './OrderList';

export default class CardDemo extends React.PureComponent {
    render() {
        const { orders } = this.props;
        const orderlist = orders.toJS();
        // alert(JSON.stringify(orders));
        return (
            <React.Fragment>
                <OrderList
                    orders={orderlist}
                    layout="234"
                    className="bg234"
                    itemClassName="bgt"
                />
                <br />
                <br />
                <br />
                <br />
                <br />
                <CPanel title="订单- 待付款" className="bgw" padding="none">
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
                    className="bg112"
                    itemClassName="cbg234"
                />

                <br />
                <br />
                <br />
                <br />
                <br />

                <CPanel title="Gird Card 123" className="bgw">
                    <OrderList
                        orders={orderlist}
                        layout="123"
                        className="bgt"
                        itemClassName="bgt"
                    />
                </CPanel>
            </React.Fragment>
        );
    }
}

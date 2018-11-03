import React from 'react';
import './../../asset/style/card.less';
import { CPanel } from '@/component/_base';
import CardList from './CardList';

export default class CardDemo extends React.PureComponent {
    render() {
        const { orders } = this.props;
        const orderlist = orders.toJS();
        // alert(JSON.stringify(orders));
        return (
            <React.Fragment>
                <CPanel title="核心课程">
                    <CardList
                        orders={orderlist}
                        layout="234C"
                        className="bgt"
                        itemClassName="bgt"
                    />
                </CPanel>
                <CPanel title="录课老师" className="bgdark">
                    <CardList
                        orders={orderlist}
                        layout="245"
                        className="bgt"
                        itemClassName="bgt"
                    />
                </CPanel>

                <CPanel title="AIRBNB">
                    <CardList
                        orders={orderlist}
                        layout="234"
                        className="bgt"
                        itemClassName="bgt"
                    />
                </CPanel>
                <br />
                <br />
                <br />
                <br />
                <br />

                <CardList
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
                <CPanel title="订单- 待付款" className="bgw" padding="none">
                    <CardList
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

                <CPanel title="Gird Card 123" className="bgw">
                    <CardList
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

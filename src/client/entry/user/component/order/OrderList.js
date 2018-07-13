import React from 'react';
import { CCardContainer, CCard } from '@/component/_base';

const OrderItem = ({ order, layout, actions }) => {
    return (
        <CCard layout={layout} className="bg111">
            {order.weight}
        </CCard>
    );
};

const OrderList = ({ orders, layout, className, actions }) => {
    let orderList = orders.map((order, i) => {
        return (
            <OrderItem
                key={order.id}
                order={order}
                layout={layout}
                actions={actions}
            />
        );
    });

    return <CCardContainer className={className}>{orderList}</CCardContainer>;
};
export default OrderList;

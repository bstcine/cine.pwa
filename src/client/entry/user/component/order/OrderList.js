import React from 'react';
import { CCardContainer, CCard } from '@/component/_base';

const OrderItem = ({ order, layout, className, actions }) => {
    return (
        <CCard layout={layout} className={className} hover="darken">
            {order.weight}
        </CCard>
    );
};

const OrderList = ({ orders, layout, className, itemClassName, actions }) => {
    let orderList = orders.map((order, i) => {
        return (
            <OrderItem
                key={order.id}
                order={order}
                layout={layout}
                className={itemClassName}
                actions={actions}
            />
        );
    });

    return <CCardContainer className={className} gap="large">{orderList}</CCardContainer>;
};
export default OrderList;

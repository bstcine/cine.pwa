import React from 'react';
import { CCardContainer, CCard } from '@/component/_base';
import OrderItemH from './OrderItem';

const OrderItem = ({ order, layout, className, actions }) => {
    let hover = layout === '123' ? 'outlined' : 'darken';
    return (
        <CCard layout={layout} className={className} hover={hover}>
            <OrderItemH order={order} actions={actions} />
        </CCard>
    );
};

const OrderList = ({ orders, layout, className, itemClassName, actions }) => {
    let orderList = orders.map((order, i) => {
        return (
            <OrderItem
                key={order.favorite}
                order={order}
                layout={layout}
                className={itemClassName}
                actions={actions}
            />
        );
    });

    return (
        <CCardContainer className={className} gap="large">
            {orderList}
        </CCardContainer>
    );
};
export default OrderList;

import React from 'react';
import { CCardContainer, CCard } from '@/component/_base';
import { CardItem, CardItem112 } from './CardItem';

const OrderItem = ({ order, layout, className, actions }) => {
    let hover = layout === '123' ? 'outlined' : 'darken';
    hover = layout === '112' ? 'lighten' : hover;
    const isCard112 = layout === '112';
    return (
        <CCard layout={layout} className={className} hover={hover}>
            {isCard112 ? (
                <CardItem112 value={order} actions={actions} />
            ) : (
                <CardItem value={order} actions={actions} />
            )}
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

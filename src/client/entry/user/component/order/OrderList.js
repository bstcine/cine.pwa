import React from 'react';
import { CCardContainer, CCard } from '@/component/_base';
import { CardItem, CardItem112, CardItem111 } from './CardItem';

const OrderItem = ({ order, layout, className, actions }) => {
    let hover = layout === '123' ? 'outlined' : 'darken';
    hover = layout === '112' ? 'lighten' : hover;

    let item = <CardItem value={order} actions={actions} />;
    switch (layout) {
        case '111':
            item = <CardItem111 value={order} actions={actions} />;
            break;
        case '112':
            item = <CardItem112 value={order} actions={actions} />;
            break;
        case '123':
            item = <CardItem value={order} actions={actions} />;
            break;
    }

    return (
        <CCard layout={layout} className={className} hover={hover}>
            {item}
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
        <CCardContainer
            className={className}
            gap={layout === '111' ? 'lighten' : 'large'}
        >
            {orderList}
        </CCardContainer>
    );
};
export default OrderList;

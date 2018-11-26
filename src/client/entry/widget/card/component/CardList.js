import React from 'react';
import { CCardContainer } from '@/component/_base';
import {
    CardItem,
    CardList,
} from '@/component/CardItem';
import { CardItem111 } from './CardItem';

const CItem = ({ value, layout, actions }) => {
    // 'none' | 'darken'| 'lighten' | 'outlined'
    let item = <CardItem value={value} hover="none" actions={actions} />;
    switch (layout) {
        case '111':
            item = <CardItem111 value={value} actions={actions} />;
            break;
        case '112':
            item = <CardItem value={value} layout="112" hover="darken" />;
            break;
        case '123':
            item = <CardItem value={value} actions={actions} />;
            break;
    }

    return item;
};

const CardExList = ({ orders, layout, className, type, actions }) => {
    let exList;

    switch (layout) {
        case '234':
            exList = (
                <CardList
                    list={orders}
                    layout={layout}
                    hover = "none"
                    limit={8}
                    actions={actions}
                />
            );
            break;
        default:
            exList = orders.map((item, i) => {
                return <CItem key={i} value={item} layout={layout} />;
            });
    }

    return (
        <CCardContainer
            className={className}
            layout={layout}
            gap={
                layout === '111' ? 'small' : type === 'course' ? 'normal' : null
            }
        >
            {exList}
        </CCardContainer>
    );
};
export default CardExList;

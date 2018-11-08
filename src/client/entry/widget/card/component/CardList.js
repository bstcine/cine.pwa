import React from 'react';
import { CCardContainer, CCard } from '@/component/_base';
import { CardItem, CardTeacher, CardCourse } from '@/component/CardItem';
import { CardItem111 } from './CardItem';

const CItem = ({ value, layout, className, actions }) => {
    // 'none' | 'darken'| 'lighten' | 'outlined'
    let item = <CardItem value={value} hover="darken" actions={actions} />;
    switch (layout) {
        case '234C':
            item = (
                <CardCourse course={value} hover="lighten" actions={actions} />
            );
            break;
        case '111':
            item = <CardItem111 value={value} actions={actions} />;
            break;
        case '112':
            item = (
                <CardItem
                    value={value}
                    layout="112"
                    hover="darken"
                    actions={actions}
                />
            );
            break;
        case '123':
            item = <CardItem value={value} actions={actions} />;
            break;
        case '245':
            item = <CardTeacher value={value} actions={actions} />;
            break;
    }

    return item;
};

const CardList = ({ orders, layout, className, itemClassName, actions }) => {
    let cardList = orders.map((item, i) => {
        return (
            <CItem
                key={i}
                value={item}
                layout={layout}
                className={itemClassName}
                actions={actions}
            />
        );
    });

    return (
        <CCardContainer
            className={className}
            layout={layout === '234C' ? '234' : layout}
            gap={
                layout === '111' ? 'small' : layout === '234C' ? 'normal' : null
            }
        >
            {cardList}
        </CCardContainer>
    );
};
export default CardList;

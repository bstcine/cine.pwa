import React from 'react';
import { CCardContainer, CCard } from '@/component/_base';
import { CardItem, CardTeacher, CardCourse } from '@/component/CardItem';
import { CardItem112, CardItem111 } from './CardItem';

const CItem = ({ value, layout, className, actions }) => {
    // 'none' | 'shadow' | 'darken'| 'lighten' | 'outlined'
    let hover = 'darken';
    let item = <CardItem value={value} actions={actions} />;
    switch (layout) {
        case '234C':
            item = <CardCourse course={value} actions={actions} />;
            break;
        case '111':
            item = <CardItem111 value={value} actions={actions} />;
            hover = 'lighten';
            break;
        case '112':
            item = <CardItem112 value={value} actions={actions} />;
            hover = 'darken';
            break;
        case '123':
            item = <CardItem value={value} actions={actions} />;
            hover = 'shadow';
            break;
        case '245':
            item = <CardTeacher value={value} actions={actions} />;
            hover = 'darken';
            break;
    }

    return (
        <CCard className={className} hover={hover}>
            {item}
        </CCard>
    );
};

const CardList = ({ orders, layout, className, itemClassName, actions }) => {
    let cardList = orders.map((item, i) => {
        return (
            <CItem
                key={item.favorite}
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
            gap={layout === '111' ? 'small' : null}
        >
            {cardList}
        </CCardContainer>
    );
};
export default CardList;

import React from 'react';
import { CCardContainer } from '@/component/_base';
import {
    CardItem,
    TeacherList,
    CourseList,
    ArticleList,
} from '@/component/CardItem';
import { CardItem111 } from './CardItem';

const CItem = ({ value, layout, actions }) => {
    // 'none' | 'darken'| 'lighten' | 'outlined'
    let item = <CardItem value={value} hover="darken" actions={actions} />;
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

const CardList = ({ orders, layout, className, actions }) => {
    let cardList;
    cardList = orders.map((item, i) => {
        return (
            <CItem
                key={i}
                value={item}
                layout={layout}
                actions={actions}
            />
        );
    });

    switch (layout) {
        case '234C':
            cardList = <CourseList list={orders} hover="lighten" />;
            break;
        case '112A':
            cardList = <ArticleList list={orders} hover="darken" />;
            break;
        case '245':
            cardList = <TeacherList list={orders} />;
            break;
    }

    return (
        <CCardContainer
            className={className}
            layout={
                layout === '234C' ? '234' : layout === '112A' ? '112' : layout
            }
            gap={
                layout === '111' ? 'small' : layout === '234C' ? 'normal' : null
            }
        >
            {cardList}
        </CCardContainer>
    );
};
export default CardList;

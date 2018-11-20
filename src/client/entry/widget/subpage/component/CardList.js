import React from 'react';
import { CCardContainer } from '@/component/_base';
import {
    TeacherList,
    CourseList,
    ArticleList,
    CardList,
} from '@/component/CardItem';

const CardExList = ({ orders, layout, className, type, actions }) => {
    let exList;

    switch (type) {
        case 'course':
            exList = <CourseList list={orders} hover="lighten" />;
            break;
        case 'article':
            exList = <ArticleList list={orders} hover="darken" />;
            break;
        case 'teacher':
            {
                const isMentor = false;
                exList = <TeacherList list={orders} isMentor={isMentor} />;
            }
            break;
        case 'card':
            exList = (
                <CardList
                    list={orders}
                    layout={layout}
                    hover="none"
                    limit={8}
                    actions={actions}
                />
            );
            break;
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

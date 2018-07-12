import React from 'react';
import Card from './Card';
import CardContainer from './CardContainer';

const CCard = ({
    // '112' | '122' | '123' | '234'
    layout = '112',
    // 'none' | 'shadow' | 'darken' | 'outlined'
    hover = 'shadow',
    className,
    onClick,
    children,
}) => (
    <Card layout={layout} className={className} hover={hover} onClick={onClick}>
        {children}
    </Card>
);

const CCardContainer = ({
    className,
    // 'none' | null | 'large'
    gap,
    children,
}) => (
    <CardContainer className={className} gap={gap}>
        {children}
    </CardContainer>
);

export { CCardContainer, CCard };

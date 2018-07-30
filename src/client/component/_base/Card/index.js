import React from 'react';
import Card from './Card';
import CardContainer from './CardContainer';

const CCard = ({
    layout = '112',
    hover = 'darken',
    className,
    onClick,
    children,
}) => (
    <Card layout={layout} className={className} hover={hover} onClick={onClick}>
        {children}
    </Card>
);

const CCardContainer = ({ className, gap, children }) => (
    <CardContainer className={className} gap={gap}>
        {children}
    </CardContainer>
);

export { CCardContainer, CCard };

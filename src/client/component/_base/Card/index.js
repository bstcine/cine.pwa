import React from 'react';
import Card from './Card';
import CardContainer from './CardContainer';

const CCard = ({
    hover = 'darken',
    href = null,
    className,
    onClick,
    children,
}) => (
    <Card href={href} className={className} hover={hover} onClick={onClick}>
        {children}
    </Card>
);

const CCardContainer = ({ className, gap, layout = '112', children }) => (
    <CardContainer className={className} gap={gap} layout={layout}>
        {children}
    </CardContainer>
);

export { CCardContainer, CCard };

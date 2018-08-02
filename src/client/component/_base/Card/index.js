import React from 'react';
import Card from './Card';
import CardContainer from './CardContainer';
import CardDrawer from './CardDrawer';

const CCard = ({
    layout = '112',
    hover = 'darken',
    href = null,
    className,
    onClick,
    children,
}) => (
    <Card
        layout={layout}
        href={href}
        className={className}
        hover={hover}
        onClick={onClick}>
        {children}
    </Card>
);

const CCardContainer = ({ className, gap, children }) => (
    <CardContainer className={className} gap={gap}>
        {children}
    </CardContainer>
);

const CCardDrawer = ({ className, gap, onClose, isOpen, children }) => (
    <CardDrawer
        className={className}
        gap={gap}
        isOpen={isOpen}
        onClose={onClose}>
        {children}
    </CardDrawer>
);

export { CCardContainer, CCardDrawer, CCard };

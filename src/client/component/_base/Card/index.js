import React from 'react';
import Card from './Card';
import Grid from './Grid';

export const CCard = ({
    layout,
    selectedStyle,
    className,
    onClick,
    children,
}) => (
    <Card
        layout={layout}
        selectedStyle={selectedStyle}
        className={className}
        onClick={onClick}>
        {children}
    </Card>
);

export const CGrid = ({ className, children }) => (
    <Grid className={className}>{children}</Grid>
);

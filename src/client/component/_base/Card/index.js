import React from 'react';
import Card from './Card';
import Grid from './Grid';

export const CCard = ({
    layout,
    selectedStyle,
    className,
    gap,
    onClick,
    children,
}) => (
    <Card
        layout={layout}
        selectedStyle={selectedStyle}
        className={className}
        gap={gap}
        onClick={onClick}>
        {children}
    </Card>
);

export const CGrid = ({ className, gap, children }) => (
    <Grid className={className} gap={gap}>
        {children}
    </Grid>
);

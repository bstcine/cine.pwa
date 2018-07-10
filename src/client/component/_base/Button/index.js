import React from 'react';
import Button from './Button';

const CButton = ({
    children,
    className,
    disabled,
    fullWidth,
    href,
    color,
    variant,
    size,
    onClick,
}) => (
    <Button
        className={className}
        disabled={disabled}
        fullWidth={fullWidth}
        href={href}
        color={color}
        variant={variant}
        size={size}
        onClick={onClick}>
        {children}
    </Button>
);

export default CButton;

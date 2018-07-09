import React from 'react';
import Button from './Button';

const CButton = ({
    children,
    className,
    disabled,
    href,
    color,
    variant,
    size,
    onClick,
}) => (
    <Button
        className={className}
        disabled={disabled}
        href={href}
        color={color}
        variant={variant}
        size={size}
        onClick={onClick}>
        {children}
    </Button>
);

export default CButton;

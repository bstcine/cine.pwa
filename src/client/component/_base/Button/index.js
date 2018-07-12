import React from 'react';
import Button from './Button';

const CButton = ({
    children,
    className,
    disabled,
    fullWidth,
    href,
    // null | 'primary' | 'secondary'
    color,
    // null | 'contained' | 'outlined' | 'fab' || 'round'
    variant,
    // 'small' | null | 'large'
    size,
    mini,
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
        mini={mini}
        onClick={onClick}>
        {children}
    </Button>
);

const CIconButton = ({ color, mini, children, onClick }) => (
    <Button mini={mini} variant="round" color={color} onClick={onClick}>
        <i className="material-icons">{children}</i>
    </Button>
);

export { CIconButton };

export default CButton;

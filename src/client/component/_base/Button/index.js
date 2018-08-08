import React from 'react';
import Button from './Button';
import Icon from '../Icon';

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

const CIconButton = ({ color, className, mini, children, onClick }) => (
    <Button
        mini={mini}
        className={className}
        variant="round"
        color={color}
        onClick={onClick}>
        <Icon>{children}</Icon>
    </Button>
);

export { CIconButton };

export default CButton;

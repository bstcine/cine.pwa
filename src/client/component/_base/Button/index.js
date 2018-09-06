import React from 'react';
import BaseButton from './Button';
import Icon from '../Icon';

const Button = ({
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
    <BaseButton
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
    </BaseButton>
);

const IconButton = ({ color, className, mini, children, onClick }) => (
    <BaseButton
        mini={mini}
        className={className}
        variant="round"
        color={color}
        onClick={onClick}>
        <Icon>{children}</Icon>
    </BaseButton>
);

export { IconButton };

export default Button;

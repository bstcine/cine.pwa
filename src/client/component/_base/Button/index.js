import React from 'react';
import BaseButton from './Button';
import Icon from '../Icon';

const Button = ({
    icon,

    disabled,
    block,
    transparent,
    color,
    variant,
    size,
    shape,

    className,
    component,
    href,
    onClick,
    children,
}) => (
    <BaseButton
        className={className}
        component={component}
        disabled={disabled}
        block={block}
        href={href}
        color={color}
        variant={variant}
        size={size}
        shape={shape}
        transparent={transparent}
        onClick={onClick}>
        {icon && <Icon>{icon}</Icon>}
        {children}
    </BaseButton>
);

const IconButton = ({ color, className, children, onClick }) => (
    <BaseButton
        className={className}
        shape="round"
        color={color}
        onClick={onClick}>
        <Icon>{children}</Icon>
    </BaseButton>
);

const FloatingButton = ({ icon, className, color, children, onClick }) => (
    <BaseButton
        className={className}
        size="large"
        shape="round"
        variant="contained"
        color={color}
        onClick={onClick}>
        {icon && <Icon>{icon}</Icon>}
        {children}
    </BaseButton>
);

export { IconButton, FloatingButton };

export default Button;

import React from 'react';
import BaseButton from './Button';
import FloatingButton from './FloatingButton';
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
        onClick={onClick}
    >
        {icon && <Icon>{icon}</Icon>}
        {children}
    </BaseButton>
);

const IconButton = ({ color, size, className, icon, onClick }) => (
    <Button
        className={className}
        shape="round"
        icon={icon}
        color={color}
        size={size}
        onClick={onClick}
    />
);

export { FloatingButton, IconButton };

export default Button;

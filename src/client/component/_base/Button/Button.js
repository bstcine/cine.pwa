import React, { Component } from 'react';
import classNames from 'classnames';
import './style.less';
import { baseprefix } from '@/component/_base/config';

const btnCls = `${baseprefix}-btn`;

export default class Button extends Component {
    static defaultProps = {
        component: 'button',
        color: 'default',
        size: 'medium',
    };

    render() {
        const {
            children,
            className,
            component,
            disabled,
            fullWidth,
            href,
            color,
            variant,
            size,
            mini,
            onClick,
        } = this.props;
        let ComponentProp = component;
        if (component === 'button' && href) {
            ComponentProp = 'a';
        }
        return (
            <ComponentProp
                className={classNames(
                    `${btnCls}`,
                    {
                        [`${btnCls}--fullWidth`]: !!fullWidth,
                        [`${btnCls}--small`]: size === 'small',
                        [`${btnCls}--large`]: size === 'large',
                        [`${btnCls}--${color}`]: !!color,
                        [`${btnCls}--contained`]:
                            variant === 'contained' || variant === 'fab',
                        [`${btnCls}--outlined`]: variant === 'outlined',
                        [`${btnCls}--fab`]: variant === 'fab',
                        [`${btnCls}--disabled`]: disabled,
                        [`${btnCls}--mini`]: mini,
                    },
                    className
                )}
                disabled={disabled}
                onClick={onClick}
                href={href}>
                {children}
            </ComponentProp>
        );
    }
}

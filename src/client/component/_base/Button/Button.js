import React, { Component } from 'react';
import classNames from 'classnames';
import './style.less';
import { baseprefix } from '@/component/_base/config';

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
            href,
            color,
            variant,
            size,
            onClick,
        } = this.props;
        let ComponentProp = component;
        if (component === 'button' && href) {
            ComponentProp = 'a';
        }
        const btnCls = `${baseprefix}-btn`;
        return (
            <ComponentProp
                className={classNames(
                    `${btnCls}`,
                    {
                        [`${btnCls}--small`]: size === 'small',
                        [`${btnCls}--large`]: size === 'large',
                        [`${btnCls}--${color}`]: !!color,
                        [`${btnCls}--${variant}`]: !!variant,
                        [`${btnCls}--disabled`]: disabled,
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

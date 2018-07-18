import React, { PureComponent } from 'react';
import classNames from 'classnames';
import './style.less';
import { componentNames } from '@/component/_base/config';
const cls = componentNames.Button;

export default class Button extends PureComponent {
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
            // null | 'primary' | 'secondary'
            color,
            // null | 'contained' | 'outlined' | 'fab'
            variant,
            // 'small' | null | 'large'
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
                    `${cls}`,
                    {
                        [`${cls}--fullWidth`]: !!fullWidth,
                        [`${cls}--small`]: size === 'small',
                        [`${cls}--large`]: size === 'large',
                        [`${cls}--${color}`]: !!color,
                        [`${cls}--contained`]:
                            variant === 'contained' || variant === 'fab',
                        [`${cls}--outlined`]: variant === 'outlined',
                        [`${cls}--round`]:
                            variant === 'fab' || variant === 'round',
                        [`${cls}--disabled`]: disabled,
                        [`${cls}--mini`]: mini,
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

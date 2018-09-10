import PropTypes from 'prop-types';
import React, { PureComponent, Children } from 'react';
import classNames from 'classnames';
import './style.less';
import { componentNames } from '@/component/_base/config';
const cls = componentNames.Button;

export default class Button extends PureComponent {
    static defaultProps = {
        component: 'button',
        color: 'default',
        size: null,
        transparent: false,
        block: false,
        shape: null,
    };

    render() {
        const {
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
                        [`${cls}--disabled`]: !!disabled,
                        [`${cls}--block`]: !!block,
                        [`${cls}--transparent`]: !!transparent,

                        [`${cls}--${color}`]: !!color,

                        [`${cls}--contained`]: variant === 'contained',
                        [`${cls}--outlined`]: variant === 'outlined',

                        [`${cls}--small`]: size === 'small',
                        [`${cls}--large`]: size === 'large',

                        [`${cls}--round`]: shape === 'round',
                        [`${cls}--capsule`]: shape === 'capsule',
                    },
                    className
                )}
                disabled={disabled}
                onClick={onClick}
                href={href}>
                {Children.map(
                    children,
                    child =>
                        (typeof child === 'string' ? <span>{child}</span> : child)
                )}
            </ComponentProp>
        );
    }
}

Button.propTypes = {
    /**
     * 自定义样式
     */
    className: PropTypes.string,
    /**
     * 设置组件类型，可以是 button 标签，也可以是 a 标签
     */
    component: PropTypes.oneOf(['a', 'button']),
    /**
     * 禁用状态
     */
    disabled: PropTypes.bool,
    /**
     * 宽度调整为100%
     */
    block: PropTypes.bool,
    /**
     * component 为 a 标签的时候需要的字段
     */
    href: PropTypes.string,
    /**
     * 颜色
     */
    color: PropTypes.oneOf(['default', 'primary', 'secondary']),
    /**
     * 样式
     */
    variant: PropTypes.oneOf(['contained', 'outlined']),
    /**
     * 尺寸
     */
    size: PropTypes.oneOf(['small', 'large']),
    /**
     * 形状
     * 圆形 胶囊形
     */
    shape: PropTypes.oneOf(['round', 'capsule']),
    /**
     * 透明背景
     */
    transparent: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
};

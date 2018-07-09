import React, { Component } from 'react';
import classNames from 'classnames';
import './style.less';

export default class CButton extends Component {
    static defaultProps = {
        component: 'button',
        prefixCls: 'cine-btn',
        color: 'default',
        ripple: true,
    };

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        const { ripple, onClick } = this.props;
        const ele = e.currentTarget;
        if (ripple) {
            const { top, left } = ele.getBoundingClientRect();
            const circle = ele.querySelector('.cine-ripple__circle');
            circle.style.left = `${e.clientX - left}px`;
            circle.style.top = `${e.clientY - top}px`;
            circle.addEventListener(
                'animationend',
                () => {
                    if (ele.classList.contains('cine-ripple--active')) ele.classList.remove('cine-ripple--active');
                },
                { once: true }
            );
            ele.classList.add('cine-ripple--active');
        }
        onClick && onClick();
    }

    render() {
        const {
            children,
            className,
            component = 'button',
            prefixCls = 'cine-btn',
            disabled,
            href,
            color = 'default',
            variant,
            ripple = true,
        } = this.props;
        let ComponentProp = component;
        if (component === 'button' && href) {
            ComponentProp = 'a';
        }
        return (
            <ComponentProp
                className={classNames(
                    `${prefixCls}`,
                    {
                        'cine-ripple': ripple,
                        [`${prefixCls}--${color}`]: !!color,
                        [`${prefixCls}--${variant}`]: !!variant,
                        [`${prefixCls}--disabled`]: disabled,
                    },
                    className
                )}
                disabled={disabled}
                onClick={this.onClick}
                href={href}>
                {children}
                {ripple && <span className="cine-ripple__circle" />}
            </ComponentProp>
        );
    }
}

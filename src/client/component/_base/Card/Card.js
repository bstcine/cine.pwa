import React from 'react';
import classNames from 'classnames';
import './style.less';
import { componentNames } from '@/component/_base/config';
const cls = componentNames.Card;

const Card = ({
    // '112' | '122' | '123' | '234'
    layout = '112',
    // 'none' | 'shadow' | 'darken'| 'lighten' | 'outlined'
    hover = 'darken',
    href = null,
    className,
    children,
    onClick,
}) => {
    const Comp = href ? 'a' : 'div';

    return (
        <Comp
            className={classNames(cls, {
                [`${cls}--col${layout}`]: !!layout,
            })}
            href={Comp === 'a' && href}
            onClick={onClick}>
            <div
                className={classNames(
                    `${cls}__content`,
                    {
                        [`${cls}__content--shadow`]: hover === 'shadow',
                        [`${cls}__content--darken`]: hover === 'darken',
                        [`${cls}__content--outlined`]: hover === 'outlined',
                        [`${cls}__content--lighten`]: hover === 'lighten',
                    },
                    className
                )}>
                {children}
            </div>
        </Comp>
    );
};

export default Card;

import React from 'react';
import classNames from 'classnames';
import './style.less';
import { componentNames } from '@/component/_base/config';
const cls = componentNames.Card;

const Card = ({
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
            className={cls}
            href={Comp === 'a' ? href : null}
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

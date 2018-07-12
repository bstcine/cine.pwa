import React from 'react';
import classNames from 'classnames';
import './style.less';
import { baseprefix } from '@/component/_base/config';

const cls = `${baseprefix}-card`;

const Card = ({
    // '112' | '122' | '123' | '234'
    layout = '112',
    // 'none' | 'shadow' | 'darken' | 'outlined'
    hover = 'shadow',
    className,
    children,
    onClick,
}) => {
    return (
        <div
            className={classNames(cls, {
                [`${cls}--col${layout}`]: !!layout,
            })}
            onClick={onClick}>
            <div
                className={classNames(
                    `${cls}__content`,
                    {
                        [`${cls}__content--shadow`]: hover === 'shadow',
                        [`${cls}__content--darken`]: hover === 'darken',
                        [`${cls}__content--outlined`]: hover === 'outlined',
                    },
                    className
                )}>
                {children}
            </div>
        </div>
    );
};

export default Card;

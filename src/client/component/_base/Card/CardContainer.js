import React from 'react';
import classNames from 'classnames';
import './style.less';
import { baseprefix } from '@/component/_base/config';

const cls = `${baseprefix}-card`;

const CardContainer = ({
    className,
    children,
    // 'none' | null | 'large'
    gap,
}) => {
    return (
        <div className={classNames(`${cls}__container`, className)}>
            <div
                className={classNames(`${cls}__grid`, {
                    [`${cls}__gap--large`]: gap === 'large',
                    [`${cls}__gap--none`]: gap === 'none',
                })}>
                {children}
            </div>
        </div>
    );
};

export default CardContainer;
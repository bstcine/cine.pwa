import React, { Children } from 'react';
import classNames from 'classnames';
import { CCardDrawer } from '@/component/_base';
import './style.less';
import { baseprefix } from '@/component/_base/config';

const cls = `${baseprefix}-card`;

const CardContainer = ({
    className,
    children,
    // 'none' | null | 'large'
    gap,
}) => {
    let cards = [];
    let drawer = null;
    Children.map(children, item => {
        if (item.type === CCardDrawer) {
            drawer = item;
        } else {
            cards.push(item);
        }
    });
    return (
        <div className={classNames(`${cls}__container`, className)}>
            <div
                className={classNames(`${cls}__grid`, {
                    [`${cls}__gap--large`]: gap === 'large',
                    [`${cls}__gap--none`]: gap === 'none',
                })}>
                {cards}
            </div>
            {drawer}
        </div>
    );
};

export default CardContainer;

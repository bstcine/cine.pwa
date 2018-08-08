import React, { Children } from 'react';
import classNames from 'classnames';
import { CDrawer } from '@/component/_base';
import './style.less';
import { componentNames } from '@/component/_base/config';
const cls = componentNames.Card;
const drawerCls = componentNames.Drawer;

const CardContainer = ({
    className,
    children,
    // '112' | '122' | '123' | '234'
    layout = '112',
    // 'none' | null | 'large'
    gap,
}) => {
    let cards = [];
    let drawer = null;
    Children.map(children, item => {
        if (item.type === CDrawer) {
            drawer = item;
        } else {
            cards.push(item);
        }
    });
    return (
        <div
            className={classNames(
                `${cls}__container${layout === '111' ? '111' : ''}`,
                {
                    [`${cls}--col${layout}`]: !!layout,
                    [`${drawerCls}__container`]: !!drawer,
                },
                className
            )}>
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

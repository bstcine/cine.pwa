import React, { Children } from 'react';
import classNames from 'classnames';
import { CDrawer } from '@/component/_base';
import './style.less';
import { componentNames } from '@/component/_base/config';
import Swiper from '@/component/_base/Card/Swiper';
const cls = componentNames.Card;
const drawerCls = componentNames.Drawer;

const CardContainer = ({
    className,
    children,
    // '112' | '122' | '123' | '234'
    layout = '112',
    // none' | 'small' | null | 'large'
    gap,
    // none | '1'
    line,
    // 1
    step,
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
    if (line === '1') return <Swiper step={step}>{children}</Swiper>;
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
                    [`${cls}__gap--small`]: gap === 'small',
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

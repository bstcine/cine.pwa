import React, { PureComponent } from 'react';
import classNames from 'classnames';
import './style.less';
import { componentNames } from '@/component/_base/config';
import Swiper from '@/component/_base/Card/Swiper';
const cls = componentNames.Card;

class CardContainer extends PureComponent {
    render() {
        const {
            className,
            children,

            // '112' | '122' | '123' | '234'
            layout = '112',

            // 'none' | 'small' | 'large' | 'line'
            gap,

            slice,

            // none | '1'

            line,
            // 1
            step,
        } = this.props;
        if (line === '1') return <Swiper step={step}>{children}</Swiper>;
        return (
            <div
                className={classNames(
                    `${cls}__container${layout === '111' ? '111' : ''}`,
                    {
                        [`${cls}--col${layout}`]: !!layout,
                        [`${cls}__slice`]: slice,
                    },
                    className
                )}
            >
                <div
                    className={classNames(`${cls}__grid`, {
                        [`${cls}__gap--small`]: gap === 'small' && !slice,
                        [`${cls}__gap--large`]: gap === 'large' && !slice,
                        [`${cls}__gap--none`]: gap === 'none' && !slice,
                    })}
                >
                    {children}
                </div>
            </div>
        );
    }
}

export default CardContainer;

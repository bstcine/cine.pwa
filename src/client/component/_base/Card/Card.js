import React, { PureComponent } from 'react';
import classNames from 'classnames';
import './style.less';
import { componentNames } from '@/component/_base/config';
const cls = componentNames.Card;

class Card extends PureComponent {
    render() {
        const {
            // 'none' | 'opacity' | 'lighten'| 'darken' | 'outlined'
            hover,
            href = null,
            className,
            children,
            onClick,
        } = this.props;
        const Comp = href ? 'a' : 'div';

        return (
            <Comp
                className={classNames(cls, { [`${cls}--hoverable`]: true })}
                href={Comp === 'a' ? href : null}
                onClick={onClick}
            >
                <div
                    className={classNames(
                        `${cls}__content`,
                        {
                            [`${cls}__content--opacity`]: hover === 'opacity',
                            [`${cls}__content--lighten`]: hover === 'lighten',
                            [`${cls}__content--darken`]: hover === 'darken',
                            [`${cls}__content--outlined`]: hover === 'outlined',
                        },
                        className
                    )}
                >
                    {children}
                </div>
            </Comp>
        );
    }
}

export default Card;

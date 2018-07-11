import React from 'react';
import classNames from 'classnames';
import './style.less';
import { baseprefix } from '@/component/_base/config';

const cardCls = `${baseprefix}-card`;

const Card = ({ layout = '112', className, children, onClick }) => {
    return (
        <div
            className={classNames(cardCls, {
                [`${cardCls}--col${layout}`]: !!layout,
            })}
            onClick={onClick}>
            <div className={classNames(`${cardCls}__content`, className)}>
                {children}
            </div>
        </div>
    );
};

export default Card;

export { cardCls as className };

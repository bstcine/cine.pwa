import React from 'react';
import classNames from 'classnames';
import './style.less';
import { baseprefix } from '@/component/_base/config';

const cardCls = `${baseprefix}-card`;

const Card = ({ layout = '112', className, children, onClick }) => {
    return (
        <div
            className={classNames(
                cardCls,
                {
                    [`${cardCls}--col${layout}`]: !!layout,
                },
                className
            )}
            onClick={onClick}>
            <div className={`${cardCls}__content`}>{children}</div>
        </div>
    );
};

export default Card;

import React from 'react';
import classNames from 'classnames';
import './style.less';
import { baseprefix } from '@/component/_base/config';

const cardCls = `${baseprefix}-card`;

const Card = ({ className, children }) => {
    return <div className={classNames(cardCls, className)}>{children}</div>;
};

export default Card;

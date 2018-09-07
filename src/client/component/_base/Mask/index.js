import './style.less';
import classNames from 'classnames';
import React from 'react';
import { componentNames } from '@/component/_base/config';
const cls = componentNames.Mask;

const Mask = ({ transparent }) => (
    <div className={classNames(cls, { [`${cls}--transparent`]: transparent })} />
);

export default Mask;

import './style.less';
import React from 'react';
import { componentNames } from '@/component/_base/config';
const cls = componentNames.Mask;

const TransparentMask = () => <div className={`${cls}--tranparent`} />;
const Mask = () => <div className={cls} />;

export { Mask, TransparentMask };

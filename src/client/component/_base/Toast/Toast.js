import './style.less';
import React from 'react';
import classNames from 'classnames';
import { componentNames } from '../config';
const cls = componentNames.Toast;
import Mask from '../Mask';
import { CIcon } from '@/component/_base';

export default ({ type, text }) => {
    const iconMap = {
        loading: 'ci-loading',
        info: 'ci-done',
        error: 'error',
    };
    return (
        <React.Fragment>
            <Mask transparent />
            <div className={classNames(cls, { [`${cls}--${type}`]: type })}>
                {type === 'loading' ? (
                    <i className={`${cls}__icon ${cls}__loading`} />
                ) : (
                    <CIcon className={`${cls}__icon`}>{iconMap[type]}</CIcon>
                )}
                <span className={`${cls}__msg`}>{text}</span>
            </div>
        </React.Fragment>
    );
};

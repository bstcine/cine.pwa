import './style.less';
import React from 'react';
import classNames from 'classnames';
import { componentNames } from '../config';
const cls = componentNames.Toast;
import Mask from '../Mask';
import Icon from '../Icon';

export default ({ type, text }) => {
    const iconMap = {
        loading: 'ci-loading',
        success: 'ci-done',
        error: 'error',
    };
    return (
        <React.Fragment>
            <Mask transparent />
            <div className={classNames(cls, { [`${cls}--${type}`]: type })}>
                {type === 'loading' ? (
                    <i className={`${cls}__icon ${cls}__loading`} />
                ) : (
                    <Icon className={`${cls}__icon`}>{iconMap[type]}</Icon>
                )}
                <span className={`${cls}__msg`}>{text}</span>
            </div>
        </React.Fragment>
    );
};

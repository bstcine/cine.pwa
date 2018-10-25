import './style.less';
import React from 'react';
import classNames from 'classnames';
import { componentNames } from '../config';
const cls = componentNames.Toast;
import Mask from '../Mask';
import Icon from '../Icon';

export default ({ type, text, position, mask = true }) => {
    const iconMap = {
        success: 'ci-done',
        error: 'error',
    };
    const renderIcon = type => {
        if (type === 'loading') {
            return <i className={`${cls}__icon ${cls}__loading`} />;
        } else if (type === 'info') {
            return null;
        } else {
            return <Icon className={`${cls}__icon`}>{iconMap[type]}</Icon>;
        }
    };
    return (
        <React.Fragment>
            {mask && <Mask transparent />}
            <div
                className={classNames(cls, {
                    [`${cls}--${type}`]: type,
                    [`${cls}--${position}`]: position,
                })}
            >
                {renderIcon(type)}
                <span className={`${cls}__msg`}>{text}</span>
            </div>
        </React.Fragment>
    );
};

import React from 'react';
import classNames from 'classnames';
import './style.less';
/**
 * mi-xxx --> material-icons
 * ci-xxx --> cine-icons
 */
const GIcon = ({ name, className, url }) => {
    if (url) {
        return (
            <i
                className={classNames('gicons', className)}
                style={{
                    background: `url(${url}) center center / cover no-repeat`,
                }}
            />
        );
    } else {
        if (name.indexOf('mi-') === 0) {
            return (
                <i className={classNames('gicons material-icons', className)}>
                    {name.substr(3)}
                </i>
            );
        } else {
            return (
                <i
                    className={classNames('gicons cine-icons', name, className)}
                />
            );
        }
    }
};

export default GIcon;

import React from 'react';
import classNames from 'classnames';
import './style.less';
import { componentNames } from '@/component/_base/config';
const cls = componentNames.Panel;

const Panel = ({
    title,
    badge,
    children,
    className,
    ext_title,
    padding = '',
    ext_href,
}) => {
    return (
        <div className={classNames(`${cls}`, className)}>
            {!!title && (
                <div className={`${cls}__head`}>
                    <div className={`${cls}__title`}>
                        {title}
                        {Boolean(badge) && (
                            <span className={`${cls}__badge`}>{badge}</span>
                        )}
                    </div>
                    {ext_title && (
                        <a className={`${cls}__ext`} href={ext_href}>
                            {ext_title}
                        </a>
                    )}
                </div>
            )}
            <div
                className={classNames(`${cls}__body`, {
                    [`${cls}__body--paddingnone`]: padding === 'none',
                })}>
                {children}
            </div>
        </div>
    );
};

export default Panel;

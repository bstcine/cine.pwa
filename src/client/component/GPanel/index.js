import React from 'react';
import classNames from 'classnames';
import './style.less';

const GPanel = ({ title, badge, children, className, ext_title, ext_href }) => {
    return (
        <div className={classNames('g-panel', className)}>
            <div className="g-panel__head">
                <div className="g-panel__title">
                    {title}
                    {Boolean(badge) && (
                        <span className="g-panel__badge">{badge}</span>
                    )}
                </div>
                {ext_title && (
                    <a className="g-panel__ext" href={ext_href}>
                        {ext_title}
                    </a>
                )}
            </div>
            <div className="g-panel__body">{children}</div>
        </div>
    );
};

export default GPanel;

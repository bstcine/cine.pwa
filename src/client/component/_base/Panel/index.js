import React, { Children } from 'react';
import classNames from 'classnames';
import './style.less';
import { CDrawer } from '@/component/_base';
import { componentNames } from '@/component/_base/config';
const cls = componentNames.Panel;
const drawerCls = componentNames.Drawer;
import { Link } from 'react-router-dom';

const Panel = ({
    title,
    badge,
    children,
    className,
    ext_title,
    padding = '',
    ext_href,
}) => {
    let childs = [];
    let drawer = null;
    Children.map(children, item => {
        if (item.type === CDrawer) {
            drawer = item;
        } else {
            childs.push(item);
        }
    });
    return (
        <div
            className={classNames(`${cls}`, className, {
                [`${drawerCls}__container`]: !!drawer,
            })}>
            {!!title && (
                <div className={`${cls}__head`}>
                    <div className={`${cls}__title`}>
                        {title}
                        {Boolean(badge) && (
                            <span className={`${cls}__badge`}>{badge}</span>
                        )}
                    </div>
                    {ext_title && (
                        <Link to={ext_href}>
                            <span className={`${cls}__ext`}>{ext_title}</span>
                        </Link>
                    )}
                </div>
            )}
            <div
                className={classNames(`${cls}__body`, {
                    [`${cls}__body--paddingnone`]: padding === 'none',
                })}>
                {childs}
            </div>
            {drawer}
        </div>
    );
};

export default Panel;

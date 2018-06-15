import React from 'react';
import classNames from 'classnames';
import './style.less';

/**
 * Fix 首字符为书名号的时候的 margin 问题
 */
const TextFix = ({ children }) => (
    <span className={classNames({ textfix: children.indexOf('《') === 0 })}>
        {children}
    </span>
);

export default TextFix;

import React from 'react';
import { addParam } from '@/util/urlUtil';

const LayoutBanner = ({ isShow, imageUrl, link }) => {
    if (!isShow) return <div />;

    const url = imageUrl || `http://static.bstcine.com/m/subpage/mentor.jpg`;
    return (
        <div
            className="layout-banner"
            style={{
                outline: 'none',
                background: `url(${url}) center center / cover no-repeat`,
            }}
        />
    );
};
export default LayoutBanner;

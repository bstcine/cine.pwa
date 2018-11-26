import React from 'react';
import { addParam } from '@/util/urlUtil';

const LayoutBanner = ({ isShow, imageUrl, link }) => {
    const url = imageUrl || `http://static.bstcine.com/m/subpage/mentor.jpg`;
    return (
        <div
            className="layout-banner"
            onClick={() => {location.href = addParam(link)}}
            style={{
                outline: 'none',
                background: `url(${url}) center center / cover no-repeat`,
            }}
        />
    );
};
export default LayoutBanner;

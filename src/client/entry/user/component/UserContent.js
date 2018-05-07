import React from 'react';
import CouponContainer from '@/entry/user/containers/CouponContainer';
import PointContainer from '@/entry/user/containers/PointContainer';
import uaUtil from '@/util/uaUtil';

const UserContent = ({ topicId, isJustUserRoute, ...props }) => {
    // 移动端且纯用户路由时不加载
    if ((uaUtil.AndroidMobile() || uaUtil.iPhone()) && isJustUserRoute) return <div />;

    let content;
    switch (topicId) {
        case 'coupon':
            content = <CouponContainer />;
            break;
        case 'integral':
            content = <PointContainer />;
            break;
    }

    return (
        <div
            className={
                isJustUserRoute ? 'user-content just-user' : 'user-content'
            }>
            {content}
        </div>
    );
};

export default UserContent;

import React from 'react';
import CouponContainer from '@/entry/user/containers/CouponContainer';
import PointContainer from '@/entry/user/containers/PointContainer';

const UserContent = ({ topicId, isJustUserRoute, ...props }) => {
    let content = <PointContainer />;

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
            className={isJustUserRoute ? 'user-content just-user' : 'user-content'}>
            {content}
        </div>
    );
};

export default UserContent;

/**
 * Created by joe on 12/25/17.
 */
import React from 'react';
import '../asset/style/index.less';
import CouponContainer from '@/entry/user/containers/CouponContainer';
import PointContainer from '@/entry/user/containers/PointContainer';
import UserHeader from '@/entry/user/component/UserHeader';
import UserContent from '@/entry/user/component/UserContent';

const User = ({ topicId, isJustUserRoute, user, handleClick }) => {
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
        <React.Fragment>
            <UserHeader
                isJustUserRoute={isJustUserRoute}
                topicId={topicId}
                user={user}
                handleClick={handleClick}
            />
            <UserContent isJustUserRoute={isJustUserRoute} content={content} />
        </React.Fragment>
    );
};

export default User;

/**
 * Created by joe on 12/25/17.
 */
import React from 'react';
import '../asset/style/index.less';

const UserHeader = ({user}) => {
    let headImg = user.head_image ? "/f/" + user.head_image : require('../asset/image/ico_headpic.png');
    let roleImg = user.role_id + '' === "2" ? require('../asset/image/ico_teacher.png') : require('../asset/image/ico_student.png');

    return (
        <div className="user-header">
            <div className="user-logo">
                <img
                    src={headImg}/>
            </div>
            <div className="user-info">
                <div className="user-flex-a">
                    <span className="user-name">{user.nickname}</span>
                    <img className="user-edit" src={require('../asset/image/ico_edit.png')}
                         alt="user-type"/>
                </div>
                <div className="user-flex-b">
                    <img className="user-type"
                         src={roleImg}
                         alt="user-type"/>
                    <span className="user-phone">{user.phone}</span>
                </div>
            </div>
            <div className="user-point">
                <span className="user-font-hint">积分：</span>
                <span className="user-font-val">{user.point}</span>
            </div>

            <div className="user-coupon">
                <span className="user-font-hint">优惠券：</span>
                <span className="user-font-val">{user.unuseCouponsCount}</span>
            </div>

            <div className="user-home">
                <a href={'/'}><img src={require('../asset/image/ico_bst_home.png')} alt="user-home"/></a>
            </div>
        </div>
    )
}

export default UserHeader
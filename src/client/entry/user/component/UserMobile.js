import React from 'react';
import { CIcon } from '@/component/_base';
import menu from '@/constant/menu';
import * as h5 from '@/constant/menuItemUrl';
let menus = [];
menu.forEach(item => {
    if ([h5.URL_User_Index, h5.URL_Learn_Index].includes(item.url)) {
        menus = [...menus, ...item.children];
    }
});

const UserMobile = ({ user, handleClick }) => {
    let headImg = user.head_image
        ? '//www.bstcine.com/f/' + user.head_image
        : require('@/asset/image/ico_headpic.png');

    return (
        <div className="user-mobile">
            <div className="user-panel-a">
                <img src={headImg} />
                <label>{user.login}</label>
            </div>
            <div className="user-panel-b">
                <div className="a">
                    <div className="point-hint">可用积分</div>
                    <div className="point-val">{user.point}</div>
                </div>
                <div className="b">
                    <div className="coupon-hint">优惠券</div>
                    <div className="coupon-val">{user.unuseCouponsCount}</div>
                </div>
            </div>
            <div className="user-panel-c">
                {menus.map(item => {
                    return (
                        <a key={item.url} className="tab" href={item.url}>
                            <CIcon>{item.icon}</CIcon>
                            {item.label}
                        </a>
                    );
                })}
            </div>

            <div className="user-panel-c">
                <a className="tab" href="/resetPassword">
                    <CIcon>ci-edit</CIcon>
                    修改密码
                </a>
                <a className="tab" onClick={() => handleClick('quit')}>
                    <CIcon>ci-quit</CIcon>
                    退出
                </a>
            </div>
        </div>
    );
};

export default UserMobile;

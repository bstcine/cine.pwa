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

const HeaderImg = ({ user }) => {
    let img = require('@/asset/image/ico_headpic.png');
    if (user && user.head_image) {
        if (user.head_image.startsWith('http')) {
            img = user.head_image;
        } else {
            img = `//www.bstcine.com/f/${user.head_image}`;
        }
    }
    return < img src={img} alt="HeaderImg" />;
};

const UserMobile = ({ user, onLogout }) => {
    return (
        <div className="user-mobile">
            <div className="user-panel-a">
                {HeaderImg({user})}
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
                <a className="tab" href="/auth/resetpwd">
                    <CIcon>ci-edit</CIcon>
                    修改密码
                </a>
                <a className="tab" onClick={() => onLogout()}>
                    <CIcon>ci-quit</CIcon>
                    退出
                </a>
            </div>
        </div>
    );
};

export default UserMobile;

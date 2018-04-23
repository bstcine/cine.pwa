/**
 * Created by joe on 12/25/17.
 */
import React from 'react';
import '../asset/style/index.less';
import CouponContainer from "@/entry/user/containers/CouponContainer";
import {Tabs, TabItems, TabItem} from "@/component/Tabs";
import {TabPanels, TabPanel} from "@/component/Tabs";
import PointContainer from "@/entry/user/containers/PointContainer";

const UserHeader = ({user, handleClick}) => {
    let headImg = user.head_image ? "/f/" + user.head_image : require('../asset/image/ico_headpic.png');
    let roleImg = user.role_id + '' === "2" ? require('../asset/image/ico_teacher.png') : require('../asset/image/ico_student.png');

    return (
        <React.Fragment>
            <div className="user-header">
                <a className={'nav-open'}/>
                <div className="user-logo">
                    <img src={headImg}/>
                </div>
                <div className="user-info">
                    <div className="user-flex-a">
                        <span className="user-name">{user.nickname}</span>
                        <a className={'user-edit'}></a>
                    </div>
                    <div className="user-flex-b">
                        <img className="user-role" src={roleImg}/>
                        <span className="user-phone">{user.phone}</span>
                    </div>
                </div>
                <div className="user-point">
                    <span className="point-hint">积分：</span>
                    <span className="point-val">{user.point}</span>
                </div>

                <div className="user-coupon">
                    <span className="coupon-hint">优惠券：</span>
                    <span className="coupon-val">{user.unuseCouponsCount}</span>
                </div>

                <a className="nav-home" href={'/'}></a>
            </div>
            <Tabs className="user-tabs" selectedId={'coupon'}>
                <TabItems>
                    <TabItem className="tab-item tab-order"
                             indicator={user.unpayOrdersCount}>我的订单</TabItem>
                    <TabItem className="tab-item tab-study" onClick={e => handleClick('study')}>我的学习</TabItem>
                    <TabItem id={'integral'} className="tab-item tab-integral">我的积分</TabItem>
                    <TabItem id={'coupon'} className="tab-item tab-coupon">我的优惠券</TabItem>
                    <TabItem className="tab-item tab-wordtest"
                             onClick={e => handleClick('wordtest')}>词汇测试</TabItem>
                    <TabItem className="tab-item tab-grammar">核心语法测试</TabItem>
                    <TabItem className="tab-item tab-password"
                             onClick={e => handleClick('password')}>修改密码</TabItem>
                    <TabItem className="tab-item tab-quit" onClick={e => handleClick('quit')}>退出</TabItem>
                </TabItems>
                <TabPanels>
                    <TabPanel/>
                    <TabPanel id={'integral'}>
                        <PointContainer/>
                    </TabPanel>
                    <TabPanel id={'coupon'}>
                        <CouponContainer/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </React.Fragment>
    )
}

export default UserHeader
/**
 * Created by joe on 12/25/17.
 */
import React from 'react';
import '../asset/style/index.less';
import CouponContainer from "@/entry/user/containers/CouponContainer";
import {Tabs, TabItems, TabItem} from "@/component/Tabs";
import {TabPanels, TabPanel} from "@/component/Tabs";

const UserHeader = ({user, handleClick}) => {
    let headImg = user.head_image ? "/f/" + user.head_image : require('../asset/image/ico_headpic.png');
    let roleImg = user.role_id + '' === "2" ? require('../asset/image/ico_teacher.png') : require('../asset/image/ico_student.png');

    return (
        <React.Fragment>
            <div className="user-header">
                <a className={'user-panel'}><img src={require('../asset/image/ico_bst_home.png')}/></a>
                <div className="user-logo">
                    <img src={headImg}/>
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

                <a className="user-home" href={'/'}><img src={require('../asset/image/ico_bst_home.png')} alt="user-home"/></a>
            </div>
            <Tabs className="user-tabs" selectedId={'coupon'}>
                <TabItems>
                    <TabItem id={'order'} className="tab-item tab-order"
                             indicator={user.unpayOrdersCount}>我的订单</TabItem>
                    <TabItem className="tab-item tab-study" onClick={e => handleClick('study')}>我的学习</TabItem>
                    <TabItem className="tab-item tab-integral">我的积分</TabItem>
                    <TabItem id={'coupon'} className="tab-item tab-coupon">我的优惠券</TabItem>
                    <TabItem className="tab-item tab-wordtest"
                             onClick={e => handleClick('wordtest')}>词汇测试</TabItem>
                    <TabItem className="tab-item tab-grammar">核心语法测试</TabItem>
                    <TabItem className="tab-item tab-password"
                             onClick={e => handleClick('password')}>修改密码</TabItem>
                    <TabItem className="tab-item tab-quit" onClick={e => handleClick('quit')}>退出</TabItem>
                </TabItems>
                <TabPanels>
                    <TabPanel id={'order'}>
                        <span>hello order</span>
                    </TabPanel>
                    <TabPanel/>
                    <TabPanel/>
                    <TabPanel id={'coupon'}>
                        <CouponContainer/>
                    </TabPanel>
                    <TabPanel/>
                    <TabPanel/>
                    <TabPanel/>
                </TabPanels>
            </Tabs>
        </React.Fragment>
    )
}

export default UserHeader
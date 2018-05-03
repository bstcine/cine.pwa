/**
 * Created by joe on 12/25/17.
 */
import React from 'react';
import '../asset/style/index.less';
import CouponContainer from '@/entry/user/containers/CouponContainer';
import { Tabs, TabItems, TabItem, TabPanels, TabPanel } from '@/component/Tabs';
import PointContainer from '@/entry/user/containers/PointContainer';

const User = ({ topicId, isPanel, user, handleClick }) => {
    let headImg = user.head_image
        ? 'http://www.bstcine.com/f/' + user.head_image
        : require('../asset/image/ico_headpic.png');
    let roleImg =
        String(user.role_id) === '3'
            ? require('../asset/image/ico_student.png')
            : require('../asset/image/ico_teacher.png');

    return (
        <React.Fragment>
            <div className={isPanel ? 'header-panel panel' : 'header-panel'}>
                <div className={'user-panel-a'}>
                    <img src={headImg} />
                    <label>{user.login}</label>
                </div>
                <div className={'user-panel-b'}>
                    <div className={'a'}>
                        <div className="point-hint">可用积分</div>
                        <div className="point-val">{user.point}</div>
                    </div>
                    <div className={'b'}>
                        <div className="coupon-hint">优惠券</div>
                        <div className="coupon-val">
                            {user.unuseCouponsCount}
                        </div>
                    </div>
                </div>
                <div className={'user-panel-c'}>
                    <div className={'tab'}>
                        <div style={{ display: 'flex' }}>
                            <img
                                src={require('../asset/image/ico_order@2x.png')}
                                className={'gray'}
                            />
                            {Number(user.unpayOrdersCount) > 0 && (
                                <span className="tab-indicator gray">
                                    {String(user.unpayOrdersCount)}
                                </span>
                            )}
                        </div>
                        <a style={{ color: 'gray' }}>我的订单</a>
                    </div>
                    <div className={'tab'} onClick={() => handleClick('study')}>
                        <img src={require('../asset/image/ico_my_study.png')} />
                        <a>我的学习</a>
                    </div>
                    <div
                        className={'tab'}
                        onClick={() => handleClick('integral')}>
                        <img src={require('../asset/image/ico_integral.png')} />
                        <a>我的积分</a>
                    </div>
                    <div
                        className={'tab'}
                        onClick={() => handleClick('coupon')}>
                        <img
                            src={require('../asset/image/ico_coupon@2x.png')}
                        />
                        <a>我的优惠</a>
                    </div>
                </div>
                <div className={'user-panel-c'}>
                    <div
                        className={'tab'}
                        onClick={() => handleClick('wordtest')}>
                        <img
                            src={require('../asset/image/ico_wordtest@2x.png')}
                        />
                        <a>词汇量测试</a>
                    </div>
                    <div
                        className={'tab'}
                        onClick={() => handleClick('tgrammar')}>
                        <img
                            src={require('../asset/image/ico_gramar@2x.png')}
                        />
                        <a>核心语法测试</a>
                    </div>
                    {user.role_id !== '3' && (
                        <div
                            className={'tab'}
                            onClick={() => handleClick('tgrammar-teacher')}>
                            <img
                                src={require('../asset/image/ico_teacher@2x.png')}
                            />
                            <a>老师批改</a>
                        </div>
                    )}
                </div>
                <div className={'user-panel-c'}>
                    <div className={'tab'}>
                        <img
                            src={require('../asset/image/ico_coupon@2x.png')}
                            className={'gray'}
                        />
                        <a style={{ color: 'gray' }}>我的地址</a>
                    </div>
                    <div
                        className={'tab'}
                        onClick={() => handleClick('password')}>
                        <img src={require('../asset/image/ico_edit1.png')} />
                        <a>修改密码</a>
                    </div>
                    <div className={'tab'} onClick={() => handleClick('quit')}>
                        <img src={require('../asset/image/ico_quit@2x.png')} />
                        <a>退出</a>
                    </div>
                </div>
            </div>
            <div className={isPanel ? 'header-bg panel' : 'header-bg'}>
                <div className="user-header">
                    <a className={'nav-open'} href={'/user'} />
                    <div className="user-logo">
                        <img src={headImg} />
                    </div>
                    <div className="user-info">
                        <div className="user-flex-a">
                            <span className="user-name">{user.login}</span>
                            {/* <a className={'user-edit'}/> */}
                        </div>
                        <div className="user-flex-b">
                            {user.role_id !== '1' && (
                                <img className="user-role" src={roleImg} />
                            )}
                            <span className="user-phone">{user.phone}</span>
                        </div>
                    </div>
                    <div className="user-point">
                        <span className="point-hint">积分：</span>
                        <span className="point-val">{user.point}</span>
                    </div>

                    <div className="user-coupon">
                        <span className="coupon-hint">优惠券：</span>
                        <span className="coupon-val">
                            {user.unuseCouponsCount}
                        </span>
                    </div>

                    <a className="nav-home" href={'/'} />
                </div>
            </div>
            <div className={isPanel ? 'header-tab-bg panel' : 'header-tab-bg'}>
                <Tabs className="user-tabs" selectedId={topicId}>
                    <TabItems className={'tab-items container'}>
                        {/* onClick={(index, id) => handleClick(id)} */}
                        <TabItem
                            id={'order'}
                            className="tab-item tab-order"
                            indicator={user.unpayOrdersCount}
                            onTabItemClick={() => handleClick('order')}>
                            我的订单
                        </TabItem>
                        <TabItem
                            className="tab-item tab-study"
                            onTabItemClick={() => handleClick('study')}>
                            我的学习
                        </TabItem>
                        <TabItem
                            id={'integral'}
                            className="tab-item tab-integral"
                            onClick={(index, id) => handleClick(id)}>
                            我的积分
                        </TabItem>
                        <TabItem
                            id={'coupon'}
                            className="tab-item tab-coupon"
                            onClick={(index, id) => handleClick(id)}>
                            我的优惠券
                        </TabItem>
                        <TabItem
                            className="tab-item tab-wordtest"
                            onTabItemClick={() => handleClick('wordtest')}>
                            词汇量测试
                        </TabItem>
                        <TabItem
                            className="tab-item tab-grammar"
                            onTabItemClick={() => handleClick('tgrammar')}>
                            核心语法测试
                        </TabItem>
                        {user.role_id !== '3' && (
                            <TabItem
                                className="tab-item tab-grammar-teacher"
                                onTabItemClick={() =>
                                    handleClick('tgrammar-teacher')
                                }>
                                老师批改
                            </TabItem>
                        )}
                        <TabItem
                            className="tab-item tab-address"
                            onTabItemClick={() => handleClick('address')}>
                            地址管理
                        </TabItem>
                        <TabItem
                            className="tab-item tab-password"
                            onTabItemClick={() => handleClick('password')}>
                            修改密码
                        </TabItem>
                        <TabItem
                            className="tab-item tab-quit"
                            onTabItemClick={() => handleClick('quit')}>
                            退出
                        </TabItem>
                    </TabItems>
                    <TabPanels>
                        <TabPanel id={'integral'}>
                            <PointContainer />
                        </TabPanel>
                        <TabPanel id={'coupon'}>
                            <CouponContainer />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </React.Fragment>
    );
};

export default User;

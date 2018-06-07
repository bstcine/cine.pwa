import React from 'react';

const UserHeader = ({ selectId, user, handleClick }) => {
    let headImg = user.head_image
        ? 'http://www.bstcine.com/f/' + user.head_image
        : require('../asset/image/ico_headpic.png');

    let roleImg =
        String(user.role_id) === '3'
            ? require('../asset/image/ico_student.png')
            : require('../asset/image/ico_teacher.png');

    return (
        <React.Fragment>
            <div className={'user-header-info'}>
                <div className="container">
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
            <div className={'user-header-tab'}>
                <div className={'container'}>

                    <div className={'item tab-study'}>
                        <a href="/learn">我的学习</a>
                    </div>
                    <div className={'item tab-wordtest'}>
                        <a href="/vocabtest" target="_blank">
                            我的测试
                        </a>
                    </div>
                    <div
                        className={`item tab-coupon ${
                            selectId === 'coupon' ? 'active' : ''
                            }`}
                        onClick={() => {
                            handleClick('coupon');
                        }}>
                        <a>我的优惠券</a>
                    </div>
                    <div
                        className={`item tab-integral ${
                            selectId === 'integral' ? 'active' : ''
                        }`}
                        onClick={() => {
                            handleClick('integral');
                        }}>
                        <a>我的积分</a>
                    </div>
                    <div className={'item tab-order'}>
                        <a>我的订单</a>
                    </div>
                    <div className={'item tab-address'}>
                        <a>地址管理</a>
                    </div>
                    {user.role_id !== '3' && (
                        <div className={'item tab-grammar-teacher'}>
                            <a href="/teacher/dashboard" target="_blank">
                                老师批改
                            </a>
                        </div>
                    )}
                    <div className={'item tab-password'}>
                        <a href="/resetPassword">修改密码</a>
                    </div>
                    <div
                        className={'item tab-quit'}
                        onClick={() => {
                            handleClick('quit');
                        }}>
                        <a>退出</a>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default UserHeader;

import React from 'react';

const UserHeader = ({ topicId, isJustUserRoute, user, handleClick }) => {
    let headImg = user.head_image
        ? 'http://www.bstcine.com/f/' + user.head_image
        : require('../asset/image/ico_headpic.png');

    let roleImg =
        String(user.role_id) === '3'
            ? require('../asset/image/ico_student.png')
            : require('../asset/image/ico_teacher.png');

    return (
        <React.Fragment>
            {/* 用户主页-Phone */}
            <div
                className={
                    isJustUserRoute ? 'user-mobile just-user' : 'user-mobile'
                }>
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
                                style={{ width: '.42rem', height: '.45rem' }}
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
                        <img
                            src={require('../asset/image/ico_my_study.png')}
                            style={{ width: '.42rem', height: '.39rem' }}
                        />
                        <a>我的学习</a>
                    </div>
                    <div
                        className={'tab'}
                        onClick={() => handleClick('integral')}>
                        <img
                            src={require('../asset/image/ico_integral.png')}
                            style={{ width: '.42rem', height: '.42rem' }}
                        />
                        <a>我的积分</a>
                    </div>
                    <div
                        className={'tab'}
                        onClick={() => handleClick('coupon')}>
                        <img
                            src={require('../asset/image/ico_coupon@2x.png')}
                            style={{ width: '.42rem', height: '.40rem' }}
                        />
                        <a>我的优惠</a>
                    </div>
                </div>
                <div className={'user-panel-c'}>
                    <div
                        className={'tab'}
                        onClick={() => handleClick('wordtest')}>
                        <img
                            src={require('../asset/image/ico_test_word@2x.png')}
                            style={{ height: '.57rem', width: '.57rem' }}
                        />
                        <a>词汇量测试</a>
                    </div>
                    <div
                        className={'tab'}
                        onClick={() => handleClick('tgrammar')}>
                        <img
                            src={require('../asset/image/ico_test_grammar@2x.png')}
                            style={{ height: '.57rem', width: '.57rem' }}
                        />
                        <a>核心语法测试</a>
                    </div>
                    {user.role_id !== '3' && (
                        <div
                            className={'tab'}
                            onClick={() => handleClick('tgrammar-teacher')}>
                            <img
                                src={require('../asset/image/ico_test_teacher@2x.png')}
                                style={{ height: '.57rem', width: '.57rem' }}
                            />
                            <a>老师批改</a>
                        </div>
                    )}
                </div>
                <div className={'user-panel-c'}>
                    <div className={'tab'}>
                        <img
                            src={require('../asset/image/ico_address@2x.png')}
                            className={'gray'}
                            style={{ width: '.34rem', height: '.40rem' }}
                        />
                        <a style={{ color: 'gray' }}>我的地址</a>
                    </div>
                    <div
                        className={'tab'}
                        onClick={() => handleClick('password')}>
                        <img
                            src={require('../asset/image/ico_edit1.png')}
                            style={{ width: '.37rem', height: '.38rem' }}
                        />
                        <a>修改密码</a>
                    </div>
                    <div className={'tab'} onClick={() => handleClick('quit')}>
                        <img
                            src={require('../asset/image/ico_quit@2x.png')}
                            style={{ width: '.34rem', height: '.35rem' }}
                        />
                        <a>退出</a>
                    </div>
                </div>
            </div>
            {/* 用户主页-PC */}
            <div
                className={
                    isJustUserRoute
                        ? 'user-header-info panel'
                        : 'user-header-info'
                }>
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
            {/* 用户Tab-PC */}
            <div className={'user-header-tab'}>
                <div className={'container'}>
                    <div className={'item tab-order'}>
                        <a>我的订单</a>
                    </div>
                    <div className={'item tab-study'}>
                        <a href="/learn">我的学习</a>
                    </div>
                    <div
                        className={`item tab-integral ${
                            topicId === 'integral' ? 'active' : ''
                        }`}
                        onClick={() => {
                            handleClick('integral');
                        }}>
                        <a>我的积分</a>
                    </div>
                    <div
                        className={`item tab-coupon ${
                            topicId === 'coupon' ? 'active' : ''
                        }`}
                        onClick={() => {
                            handleClick('coupon');
                        }}>
                        <a>我的优惠券</a>
                    </div>
                    <div className={'item tab-wordtest'}>
                        <a href="/vocabtest" target="_blank">
                            词汇量测试
                        </a>
                    </div>
                    <div className={'item tab-grammar'}>
                        <a href="/tgrammar/quiz" target="_blank">
                            核心语法测试
                        </a>
                    </div>
                    {user.role_id !== '3' && (
                        <div className={'item tab-grammar-teacher'}>
                            <a href="/tgrammar/stats/list">老师批改</a>
                        </div>
                    )}
                    <div className={'item tab-address'}>
                        <a>地址管理</a>
                    </div>
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

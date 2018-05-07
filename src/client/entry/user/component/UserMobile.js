import React from 'react';

const UserMobile = ({ user, handleClick }) => {
    let headImg = user.head_image
        ? 'http://www.bstcine.com/f/' + user.head_image
        : require('../asset/image/ico_headpic.png');

    return (
        <div className={'user-mobile'}>
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
                    <div className="coupon-val">{user.unuseCouponsCount}</div>
                </div>
            </div>
            <div className={'user-panel-c'}>
                <a className={'tab'} style={{ color: 'gray' }}>
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
                    我的订单
                </a>
                <a className={'tab'} href={'/learn'}>
                    <img
                        src={require('../asset/image/ico_my_study.png')}
                        style={{ width: '.42rem', height: '.39rem' }}
                    />
                    我的学习
                </a>
                <a className={'tab'} href={'/user/integral'}>
                    <img
                        src={require('../asset/image/ico_integral.png')}
                        style={{ width: '.42rem', height: '.42rem' }}
                    />
                    我的积分
                </a>
                <a className={'tab'} href={'/user/coupon'}>
                    <img
                        src={require('../asset/image/ico_coupon@2x.png')}
                        style={{ width: '.42rem', height: '.40rem' }}
                    />
                    我的优惠
                </a>
            </div>
            <div className={'user-panel-c'}>
                <a className={'tab'} href={'/vocabtest'} target={'_blank'}>
                    <img
                        src={require('../asset/image/ico_test_word@2x.png')}
                        style={{ height: '.57rem', width: '.57rem' }}
                    />
                    词汇量测试
                </a>
                <a className={'tab'} href={'/tgrammar/quiz'} target={'_blank'}>
                    <img
                        src={require('../asset/image/ico_test_grammar@2x.png')}
                        style={{ height: '.57rem', width: '.57rem' }}
                    />
                    核心语法测试
                </a>
                {user.role_id !== '3' && (
                    <a
                        className={'tab'}
                        href={'/tgrammar/stats/list'}
                        target={'_blank'}>
                        <img
                            src={require('../asset/image/ico_test_teacher@2x.png')}
                            style={{ height: '.57rem', width: '.57rem' }}
                        />
                        老师批改
                    </a>
                )}
            </div>
            <div className={'user-panel-c'}>
                <a className={'tab'} style={{ color: 'gray' }}>
                    <img
                        src={require('../asset/image/ico_address@2x.png')}
                        className={'gray'}
                        style={{ width: '.34rem', height: '.40rem' }}
                    />
                    我的地址
                </a>
                <a className={'tab'} href={'/resetPassword'}>
                    <img
                        src={require('../asset/image/ico_edit1.png')}
                        style={{ width: '.37rem', height: '.38rem' }}
                    />
                    修改密码
                </a>
                <a className={'tab'} onClick={() => handleClick('quit')}>
                    <img
                        src={require('../asset/image/ico_quit@2x.png')}
                        style={{ width: '.34rem', height: '.35rem' }}
                    />
                    退出
                </a>
            </div>
        </div>
    );
};

export default UserMobile;

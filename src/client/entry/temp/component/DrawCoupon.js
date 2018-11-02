import React, { Component } from 'react';
import Api from '../../../../APIConfig';
import { fetchData } from '@/service/base';
import Modal from 'react-modal';
import moment from 'moment';
import { addParam, getParam } from '@/util/urlUtil';
import '../asset/style/DrawCoupon.less';
import { share } from '@/util/shareUtil';
import siteCodeUtil from '@/util/sitecodeUtil';
import Bridge from '@/util/bridge';
import BRIDGE_EVENT from '@/constant/bridgeEvent';
import { initWechat, setShareParam } from '@/util/wechatUtil';
import uaUtil from '@/util/uaUtil';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '3.5rem',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        padding: '0',
        marginRight: '-50%',
        background: '#ffffff',
        transform: 'translate(-50%, -50%)',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1001,
    },
};

const errMsgSelf = {
    activity_is_expire: '活动已结束，感谢参与！',
    repeat_draw: '已抽过，立即点击下方按钮，邀请更多好友一起帮你抽奖！',
    coupon_is_used: '您已使用过该优惠券！',
    draw_max_coupon: '感谢您的参与，优惠总金额已达上限！',
};

const errMsgOther = {
    activity_is_expire: '活动已结束，感谢参与！',
    repeat_draw: '已抽过，感谢您的助力！',
    coupon_is_used: '感谢您的助力，好友已成功购买！',
    draw_max_coupon: '感谢您的助力，优惠总金额已达上限！',
};

export default class LotteryCoupon extends Component {
    constructor(props) {
        super(props);

        let isSharePage = true;

        let param = {};
        let { user_id, course_id, activity_id } = this.props;
        if (user_id && course_id && activity_id) {
            isSharePage = false;
            param = { user_id, course_id, activity_id };
        } else {
            param = getParam();
            if (param.user_id) isSharePage = false;
        }

        this.state = {
            showModal: false,
            isSharePage,
            param,
            stats_activity_course: {},
            course: {},
            coupon: {},
            errMsg: null,
            drawPrice: 0,
        };

        this.onLoadInfo = this.onLoadInfo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.doShare = this.doShare.bind(this);
        this.doToCourse = this.doToCourse.bind(this);
        this.doToBuy = this.doToBuy.bind(this);

        document.title = '善恩英语双11优惠券大派送！';
    }

    async componentDidMount() {
        let { isSharePage, param } = this.state;

        if (isSharePage) {
            if (uaUtil.wechat()) {
                if (param.redirected !== '1') {
                    let url = addParam(location.href, { redirected: 1 });
                    location.href =
                        '//www.bstcine.com/wechat/authorize?redirect=' +
                        encodeURIComponent(url);
                } else {
                    await this.onLoadInfo();
                }
            } else {
                alert('请在微信端访问');
                location.href = '/';
                // await this.onLoadInfo();
            }
        } else {
            await this.onLoadInfo();
        }
    }

    handleOpenModal = () => {
        this.setState({ showModal: true });

        this.activeTimer && clearTimeout(this.activeTimer);
        this.activeTimer = setTimeout(() => {
            this.setState({ showModal: false });
        }, 3000);
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    onLoadInfo = async () => {
        let [err, result] = await fetchData(
            Api.APIURL_STATS_ACTIVITY_COURSE_INFO,
            this.state.param
        );

        if (err) return alert(err);
        this.setState(result);
        await initWechat();

        let { isSharePage, stats_activity_course, course } = this.state;
        if (isSharePage || (!isSharePage && location.pathname === '/temp/draw/coupon')) {
            let share_link =
                location.protocol +
                '//' +
                location.host +
                '/temp/draw/coupon?stats_activity_id=' +
                stats_activity_course.id;
            setShareParam({
                sharelog_id: '-1',
                title: '我正在参加善恩英语双11优惠券大派送活动！',
                link: share_link,
                imgUrl: 'https://www.bstcine.com/f/' + course.img,
                desc: '快来帮我抽优惠券！',
            });
        }
    };

    onSubmit = async () => {
        let { isSharePage, stats_activity_course, param } = this.state;

        if (!(stats_activity_course && stats_activity_course.id))
            return alert('not_stats_activity_id');

        let data = {};
        data.cid = stats_activity_course.id;
        if (isSharePage) {
            if (!param.openid) return alert('not_weixin_openid');
            data.draw_user_openid = param.openid;
        } else {
            if (!param.user_id) return alert('not_user_id');
            data.draw_user_id = param.user_id;
        }

        let [err, result] = await fetchData(
            Api.APIURL_STATS_ACTIVITY_COURSE_UPDATE,
            data
        );

        let errMsg;
        if (isSharePage) {
            errMsg = errMsgOther[err] || err;
        } else {
            errMsg = errMsgSelf[err] || err;
        }
        let drawPrice = result && result.draw_price ? result.draw_price : 0;

        this.setState({ drawPrice, errMsg });

        this.handleOpenModal();

        await this.onLoadInfo();
    };

    doShare = course => {
        let { stats_activity_course } = this.state;

        if (!(stats_activity_course && stats_activity_course.id))
            return alert('no_stats_activity_id');

        let share_link =
            location.protocol +
            '//' +
            location.host +
            '/temp/draw/coupon?stats_activity_id=' +
            stats_activity_course.id;

        let share_params = {
            sharelog_id: '-1',
            title: '我正在参加善恩英语双11优惠券大派送活动！',
            link: share_link,
            imgUrl: 'https://www.bstcine.com/f/' + course.img,
            desc: '快来帮我抽优惠券！',
        };

        share({ share_params }).then(res => {
            console.log(res);
        });
    };

    doToCourse = course_id => {
        let link = `/content/course?cid=${course_id}`;

        if (siteCodeUtil.inAPP()) {
            Bridge.common(BRIDGE_EVENT.OPEN_BROWSER, {
                url: link,
                title: '课程详情',
            });
        } else {
            location.href = link;
        }
    };

    doToBuy = course_id => {
        if (siteCodeUtil.inAPP()) {
            Bridge.common(BRIDGE_EVENT.PRE_CONFIRM, {
                course_id,
            });
        } else {
            location.href = `/pay/prepare?cid=${course_id}`;
        }
    };

    render() {
        const {
            showModal,
            isSharePage,
            stats_activity_course,
            activity,
            course,
            coupon,
            user,
            errMsg,
            drawPrice,
        } = this.state;

        let max_price =
            course && course.max_draw_price ? course.max_draw_price : '0';
        let coupon_price =
            coupon && coupon.value ? Math.floor(coupon.value) : 0;
        let draw_price =
            stats_activity_course && stats_activity_course.draw_price
                ? stats_activity_course.draw_price
                : 0;
        let friend_price = Number(coupon_price) - Number(draw_price);

        let nickname;
        if (user) {
            if (user.nickname) {
                nickname = user.nickname;
            } else if (user.phone && user.phone.length === 11) {
                nickname =
                    user.phone.slice(0, 3) + '****' + user.phone.slice(7, 11);
            } else {
                nickname = '';
            }
        }

        //正文
        let content;
        if (!isSharePage) {
            content = (
                <div className={'content_self'}>
                    <div className={'row_a'}>
                        <div className={'row_a_val'}>
                            <img
                                className={'title'}
                                src={require('../asset/image/CJ_title.png')}
                            />
                            <img
                                className={'fudai'}
                                src={require('../asset/image/btn_fudai.png')}
                                onClick={async () => {
                                    await this.onSubmit();
                                }}
                            />
                        </div>
                    </div>
                    <div className={'row_b'}>
                        <div>
                            你已抽中 <span id="draw_price">{draw_price}</span>{' '}
                            元
                        </div>
                        <div className={'max_price'}>
                            {' '}
                            本课程最高优惠 {max_price} 元
                        </div>
                    </div>
                    <div className={'line'} />
                    <div className={'row_c'}>
                        <div>
                            好友帮你抽中{' '}
                            <span id="friend_price">{friend_price}</span> 元
                        </div>
                        <img
                            src={require('../asset/image/btn_wechat.png')}
                            onClick={() => {
                                this.doShare(course);
                            }}
                        />
                    </div>
                    <div className={'line'} />
                    <div className={'row_d'}>
                        <div>
                            优惠券总金额已达 <span>{coupon_price}</span> 元
                        </div>
                        <img
                            src={require('../asset/image/btn_use.png')}
                            onClick={() => {
                                this.doToBuy(course.id);
                            }}
                        />
                    </div>
                    <div className={'line'} />
                    <div className={'row_e'}>活动说明</div>
                    <div className={'row_f'}>
                        <div>
                            1. 抽奖活动日期：
                            {activity &&
                                moment(activity.effective_at).format(
                                    'YYYY-MM-DD'
                                ) +
                                    '至' +
                                    moment(activity.expire_at).format(
                                        'YYYY-MM-DD'
                                    )}
                        </div>
                        <div>2. 优惠券有效期：抽奖之日起至2018-11-13</div>
                        <div>
                            3.
                            优惠券适用范围：本优惠券为单门视频课程专享优惠券，仅可用于购买善恩英语
                            {course.name}
                        </div>
                        <div>
                            4.
                            优惠券查询：登录善恩官网或APP，找到“我的优惠券”可查看优惠券累计金额
                        </div>
                        <div>
                            5.
                            活动及课程咨询请扫描下方二维码联系善恩小助手（微信：BSTCINE02）
                        </div>
                        <div>6. 活动最终解释权归善恩英语所有</div>
                        <div
                            style={{
                                margin: '.4rem .2rem',
                                textAlign: 'center',
                            }}
                        >
                            <img
                                src={require('@/asset/image/qrcode_bst02.jpg')}
                                className={'qrcode_img'}
                            />
                        </div>
                    </div>
                    <div className="copyright">
                        <div className="co-name">
                            善严教育科技(上海)有限公司
                        </div>
                        <div className="co-desc">
                            <div className="co-desc-year">
                                Copyright © 2014 - 2018{' '}
                                <a href="//www.bstcine.com">BSTCINE</a>. All
                                Rights Reserved.{' '}
                            </div>
                            <div className="co-desc-code">
                                沪ICP备14053596号-1
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            content = (
                <div className={'content_other'}>
                    <div className={'fixed_a'}>
                        <img src={require('../asset/image/bst_logo.png')} />
                    </div>
                    <div className={'row_a'}>
                        <img
                            className={'title'}
                            src={require('../asset/image/wx_title.png')}
                        />
                    </div>
                    <div className={'row_b'}>
                        您的好友 <span>{nickname}</span>{' '}
                        想要购买善恩的在线视频精读课程
                    </div>
                    <div
                        className={'row_c'}
                        onClick={() => {
                            this.doToCourse(course.id);
                        }}
                    >
                        <img src={'https://www.bstcine.com/f/' + course.img} />
                        <div className={'row_c_col_a'}>
                            <div className={'course_name'}>{course.name}</div>
                            <div className={'course_teacher'}>
                                授课老师：
                                {course.author}
                            </div>
                            <div className={'course_subtitle'}>
                                {course.subtitle}
                            </div>
                        </div>
                    </div>

                    <div className={'row_d'}>
                        <div className={'row_d_val'}>
                            <img
                                className={'fudai'}
                                src={require('../asset/image/btn_fudai.png')}
                                onClick={async () => {
                                    await this.onSubmit();
                                }}
                            />
                        </div>
                    </div>
                    <div className={'row_e'}>
                        <div className={'row_e_val'}>
                            <div className={'bg'}>
                                <div>
                                    {coupon_price >= max_price
                                        ? '优惠总金额已达上限：'
                                        : '优惠总金额累计已达到 '}{' '}
                                    <span>{coupon_price}</span> 元
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'row_f'}>活动说明</div>
                    <div className={'row_g'}>
                        <div>
                            1. 抽奖活动日期：
                            {activity &&
                            moment(activity.effective_at).format(
                                'YYYY-MM-DD'
                            ) +
                            '至' +
                            moment(activity.expire_at).format(
                                'YYYY-MM-DD'
                            )}
                        </div>
                        <div>2. 优惠券有效期：抽奖之日起至2018-11-13</div>
                        <div>
                            3.
                            优惠券适用范围：本优惠券为单门视频课程专享优惠券，仅可用于购买善恩英语
                            {course.name}
                        </div>
                        <div>
                            4.
                            优惠券查询：登录善恩官网或APP，找到“我的优惠券”可查看优惠券累计金额
                        </div>
                        <div>
                            5.
                            活动及课程咨询请扫描下方二维码联系善恩小助手（微信：BSTCINE02）
                        </div>
                        <div>6. 活动最终解释权归善恩英语所有</div>
                        <div
                            style={{
                                margin: '.4rem .2rem',
                                textAlign: 'center',
                            }}
                        >
                            <img
                                src={require('@/asset/image/qrcode_bst02.jpg')}
                                style={{ width: '2rem', height: '2rem' }}
                            />
                        </div>
                    </div>
                    <div className="copyright">
                        <div className="co-name">
                            善严教育科技(上海)有限公司
                        </div>
                        <div className="co-desc">
                            <div className="co-desc-year">
                                Copyright © 2014 - 2018{' '}
                                <a href="//www.bstcine.com">BSTCINE</a>. All
                                Rights Reserved.{' '}
                            </div>
                            <div className="co-desc-code">
                                沪ICP备14053596号-1
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        //提示语
        let modalHint;
        if (errMsg) {
            modalHint = errMsg;
        } else {
            if (!isSharePage) {
                modalHint = (
                    <div>
                        恭喜您!
                        <div>
                            抽中{' '}
                            <span className={'hint_draw'}>{drawPrice}</span>{' '}
                            元视频课程专用优惠券！
                        </div>
                        <div>立即点击下方按钮</div>
                        <div>邀请更多好友一起帮你抽奖！</div>
                    </div>
                );
            } else {
                modalHint = (
                    <div>
                        恭喜您为好友{' '}
                        <span className={'hint_nickname'}>{nickname}</span> 抽中
                        <div>
                            <span className={'hint_price'}>{drawPrice} </span>{' '}
                            <span style={{ color: '#e23f30' }}>元</span>
                            叠加优惠券！
                        </div>
                    </div>
                );
            }
        }

        if (!isSharePage) customStyles.content.top = '5.8rem';

        return (
            <React.Fragment>
                {content}
                <Modal
                    isOpen={showModal}
                    style={customStyles}
                    onRequestClose={this.handleCloseModal}
                >
                    <div className={'draw-modal'}>{modalHint}</div>
                </Modal>
            </React.Fragment>
        );
    }
}

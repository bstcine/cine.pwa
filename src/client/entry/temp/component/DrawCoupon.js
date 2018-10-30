import React, { Component } from 'react';
import Api from '../../../../APIConfig';
import { fetchData } from '@/service/base';
import Modal from 'react-modal';
import { getParam } from '@/util/urlUtil';
import '../asset/style/DrawCoupon.less';
import { share } from '@/util/shareUtil';
import siteCodeUtil from '@/util/sitecodeUtil';
import Bridge from '@/util/bridge';
import BRIDGE_EVENT from '@/constant/bridgeEvent';
import { initWechat } from '@/util/wechatUtil';

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
    },
};

const errMsg = {
    activity_is_expire: '活动已经过期',
    repeat_draw: '已抽过,邀请更多好友一起抽',
    coupon_is_used: '优惠券已经被使用',
};

export default class DrawCoupon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            isSelf: false,
            stats_activity_course: {},
            course: {},
            coupon: {},
            draw: { price: 0, msg: null },
        };
    }

    async componentDidMount() {
        let param = getParam();
        if (param.user_id) this.setState({ isSelf: true });

        let [err, result] = await fetchData(
            Api.APIURL_STATS_ACTIVITY_COURSE_INFO,
            param
        );

        if (err) return alert(err);

        this.setState(result);

        await initWechat();
    }

    handleOpenModal = () => {
        this.setState({ showModal: true });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    onSubmit = async () => {
        if (
            !(
                this.state.stats_activity_course &&
                this.state.stats_activity_course.id
            )
        )
            return alert('no_param');

        let data = {};
        data.cid = this.state.stats_activity_course.id;
        let param = getParam();
        if (param.user_id) data.draw_user_id = param.user_id;

        let [err, result] = await fetchData(
            Api.APIURL_STATS_ACTIVITY_COURSE_UPDATE,
            data
        );

        let msg = errMsg[err] || err;
        if (!this.state.isSelf && err === 'repeat_draw')
            msg = '你已帮好友抽过啦';

        this.setState({
            draw: {
                price: result && result.draw_price ? result.draw_price : 0,
                msg,
            },
        });

        this.handleOpenModal();
    };

    doShare = async () => {
        if (
            !(
                this.state.stats_activity_course &&
                this.state.stats_activity_course.id
            )
        )
            return alert('no_stats_activity_id');

        let help_link =
            location.origin +
            location.pathname +
            '?stats_activity_id=' +
            this.state.stats_activity_course.id;

        let share_params = {
            title: '好友抽奖',
            link: help_link,
            imgUrl: '',
            desc: '好友抽奖',
        };

        console.log(share_params);
        await share({ share_params });
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

    render() {
        const {
            showModal,
            isSelf,
            stats_activity_course,
            course,
            coupon,
            user,
            draw,
        } = this.state;

        let max_price =
            course && course.price ? Math.floor(Number(course.price) * 0.1) : 0;
        let coupon_price =
            coupon && coupon.value ? Math.floor(coupon.value) : 0;
        let draw_price =
            stats_activity_course && stats_activity_course.draw_price
                ? Math.floor(stats_activity_course.draw_price)
                : 0;
        let friend_price = Number(coupon_price) - Number(draw_price);

        let modalHint;

        if (draw && draw.msg) {
            modalHint = draw.msg;
        } else {
            if (isSelf) {
                modalHint = (
                    <div>
                        恭喜你，已抽中 <span>{draw.price}</span> 元优惠券！
                    </div>
                );
            } else {
                modalHint = (
                    <div>
                        恭喜您为好友抽中 <span>{draw.price}</span> 叠加优惠券！
                    </div>
                );
            }
        }

        let content;
        if (isSelf) {
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
                            好友帮你抽中<span id="friend_price">
                                {friend_price}
                            </span>元
                        </div>
                        <img
                            src={require('../asset/image/btn_wechat.png')}
                            onClick={() => {
                                this.doShare();
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
                                this.doToCourse(course.id);
                            }}
                        />
                    </div>
                    <div className={'line'} />
                    <div className={'row_e'}>活动说明</div>
                    <div className={'row_f'}>
                        <div>1. 活动时间</div>
                        <div>2. 抽到的金额存储在优惠券中</div>
                        <div>3. 活动解释权归善恩英语所有</div>
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
                        您的好友 <span>
                            {user && (user.nickname || user.login)}
                        </span> 想要购买善恩的在线视频精读课程
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
                                授课老师：{course.author}
                            </div>
                            <div className={'course_subtitle'}>
                                {course.subtitle}
                            </div>
                        </div>
                    </div>
                    <div className={'row_d'}>
                        <div className={'row_d_val'}>
                            <div className={'title'}>快来帮好友一起抽!</div>
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
                        <div>
                            优惠总金额累积已达到<span>{coupon_price}</span>元
                        </div>
                    </div>
                    <div className={'row_f'}>活动说明</div>
                    <div className={'row_g'}>
                        <div>1. 活动时间</div>
                        <div>2. 抽到的金额存储在优惠券中</div>
                        <div>3. 活动解释权归善恩英语所有</div>
                    </div>
                </div>
            );
        }

        return (
            <React.Fragment>
                {content}
                <Modal
                    isOpen={showModal}
                    style={customStyles}
                    onRequestClose={this.handleCloseModal}
                >
                    <div className={'success-modal'}>{modalHint}</div>
                </Modal>
            </React.Fragment>
        );
    }
}

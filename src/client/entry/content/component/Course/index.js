import React, { Component } from 'react';
import BRIDGE_EVENT from '@/constant/bridgeEvent';
import Bridge from '@/util/bridge';
import { eventEmmiter } from '@/util/eventEmmiter';
import { getParam, removeParam } from '@/util/urlUtil';
import { initWechat, setShareParam } from '@/util/wechatUtil';
import { createShare, share } from '@/util/shareUtil';
import siteCodeUtil from '@/util/sitecodeUtil';
import uaUtil from '@/util/uaUtil';
import routeUtil from '@/util/routeUtil';
import errorMsg from '@/util/errorMsg';

import storeUtil from '@/util/storeUtil';
import cCourseAction from '@/action/contentAction';

import LoginModal from '@/component/LoginModal';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import Brief from './Brief';
import DetailDesc from './DetailDesc';
import { fetchData } from '@/service/base';
import { APIURL_Order_Create } from '@/../APIConfig';
import { CDrawer, CMessage } from '@/component/_base';
import QRCode from '@/component/QRCode';
import LotteryCoupon from '@/entry/temp/component/DrawCoupon';
import authUtil from '@/util/authUtil';

export default class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoginModal: false,
            showCouponModal: false,
            isOpenLottery: false,
            course: null,
            coupon: null,
            user: null,
        };
        this.handleBuy = this.handleBuy.bind(this);
        this.handleLearn = this.handleLearn.bind(this);
        this.handleShare = this.handleShare.bind(this);
        this.relatedCourse = this.relatedCourse.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.getUserName = this.getUserName.bind(this);
        this.onClickLottery = this.onClickLottery.bind(this);
        this.login = this.login.bind(this);
    }

    async componentDidMount() {
        if (siteCodeUtil.inIOSAPP()) {
            Bridge.ios(BRIDGE_EVENT.TIMELINE, { type: 'loaded' });
        }
        window.scroll(0, 0);
        document.title = '课程详情';

        eventEmmiter.on(BRIDGE_EVENT.OUTER_SHARE, () => {
            this.handleShare(false);
        });

        this.initCurrentPageWechat();
        await this.initData();

        if (siteCodeUtil.inIOSAPP()) {
            Bridge.ios(BRIDGE_EVENT.TIMELINE, { type: 'visible' });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const locationChanged = nextProps.location !== this.props.location;
        if (locationChanged) {
            this.initCurrentPageWechat();
            this.initData();
        }
    }

    initCurrentPageWechat() {
        initWechat().then(async status => {
            if (status) {
                let { cid, source_user_id, sharelog_id } = getParam();
                if (sharelog_id) return;
                let [err, result] = await createShare({
                    type: 4,
                    cid,
                    source_user_id,
                });
                if (err) return alert(errorMsg(err));
                console.log('initWechat', result);
                let {
                    share_title,
                    share_link,
                    share_imgUrl,
                    share_desc,
                } = result;
                setShareParam({
                    title: share_title,
                    link: removeParam(share_link, ['token', 'share_mask']),
                    imgUrl: share_imgUrl,
                    desc: share_desc,
                });
            }
        });
    }

    async initData() {
        let { cid } = getParam();
        let { course, user } = await cCourseAction.initCourseDetail(cid);
        if (siteCodeUtil.inIOSAPP()) {
            if (course.temp_h5 === '1') {
                storeUtil.set('temp_h5', '1', 600 * 1000);
            } else {
                storeUtil.remove('temp_h5');
            }
        }
        this.setState({ course, user });
    }

    handleBuy() {
        if (!this.state.user) {
            this.login();
            return;
        }
        const { course } = this.state;
        let { cid, source_user_id } = getParam();
        if (course && course.currency === 'USD') {
            if (siteCodeUtil.inAPP()) {
                CMessage.info('APP暂不支持美元支付，请在官网购买');
            } else {
                fetchData(APIURL_Order_Create, { cid, currency: 'USD' }).then(
                    ([err, result]) => {
                        if (err) return CMessage.error(err);
                        let { order_id } = result;
                        location.href = `/pay/oversea?cid=${order_id}`;
                    }
                );
            }
        } else {
            if (siteCodeUtil.inIOSAPP()) {
                if (course.temp_h5 === '1') {
                    let url = `/pay/prepare?cid=${cid}`;
                    if (source_user_id) {
                        url += `&source_user_id=${source_user_id}`;
                    }
                    location.href = url;
                } else {
                    Bridge.ios(BRIDGE_EVENT.PRE_CONFIRM, { course_id: cid });
                }
            } else if (siteCodeUtil.inAndroidAPP()) {
                Bridge.android(BRIDGE_EVENT.PRE_CONFIRM, { course_id: cid });
            } else {
                let url = `/pay/prepare?cid=${cid}`;
                if (source_user_id) {
                    url += `&source_user_id=${source_user_id}`;
                }
                location.href = url;
            }
        }
    }

    handleLearn() {
        let { course } = this.state;
        if (siteCodeUtil.inIOSAPP()) {
            Bridge.ios(BRIDGE_EVENT.LEARN, {
                course_id: course.id,
                last_lesson_id: course.last_content_id,
                course_name: course.name,
            });
        } else if (siteCodeUtil.inAndroidAPP()) {
            Bridge.android(BRIDGE_EVENT.LEARN, {
                course_id: course.id,
                last_lesson_id: course.last_content_id,
                course_name: course.name,
            });
        } else {
            location.href = `/learn`;
        }
    }

    login() {
        authUtil.login({
            onSuccess: () => {
                this.initData();
            },
        });
    }

    async handleShare(need_login = true, type = 4) {
        if (need_login && !this.state.user) {
            this.login();
            return;
        }
        let { cid, source_user_id } = getParam();
        let [err, result] = await createShare({ type, cid, source_user_id });
        if (err) return alert(errorMsg(err));
        let {
            sharelog_id,
            share_title,
            share_link,
            share_imgUrl,
            share_desc,
        } = result;
        let share_params = {
            sharelog_id: sharelog_id,
            title: share_title,
            link: share_link,
            imgUrl: share_imgUrl,
            desc: share_desc,
        };
        share({ share_params }).then(res => {
            console.log(JSON.stringify(res));
            if (res.status) {
                this.initData();
            }
        });
    }

    toggleLoginModal() {
        this.setState(prevState => ({
            showLoginModal: !prevState.showLoginModal,
        }));
    }

    getUserName(user) {
        if (!user) return '';
        return user.phone || user.email || user.login;
    }

    relatedCourse(related_lesson_id) {
        const { history } = this.props;
        routeUtil.goCourse({ id: related_lesson_id }, history);
    }

    onClickLottery() {
        if (!this.state.user) {
            this.login();
            return;
        }
        if (siteCodeUtil.inAPP() || uaUtil.wechatMobile()) {
            this.setState({ isOpenLottery: true });
        } else {
            QRCode.open(this.getActUrl(true));
        }
    }

    getActUrl(withHost) {
        let { course, user } = this.state;
        let host = withHost ? location.protocol + '//' + location.host : '';
        return (
            host +
            `/temp/draw/coupon?user_id=${user.id}&course_id=${
                course.id
            }&activity_id=${course.activity_lottery.id}&allowopen=1`
        );
    }

    render() {
        let { course, user, showLoginModal, isOpenLottery } = this.state;

        return (
            <React.Fragment>
                <Header isShow={!siteCodeUtil.inAPP() && !uaUtil.wechat()} />
                <div className="container-fluid course-container-bg">
                    <div className="course-container">
                        <Brief
                            course={course}
                            user={user}
                            relatedCourse={this.relatedCourse}
                            login={this.login}
                            onClickLearn={this.handleLearn}
                            onClickBuy={this.handleBuy}
                            onClickShare={this.handleShare}
                            onClickLottery={this.onClickLottery}
                            isShowRecommend={true}
                        />

                        {course ? (
                            <DetailDesc
                                course={course}
                                isIOSAPP={siteCodeUtil.inIOSAPP()}
                                onLoadSetAndComments={
                                    cCourseAction.loadSetAndComments
                                }
                            />
                        ) : (
                            <div className="course-detail" />
                        )}

                        <CDrawer
                            fullscreen={uaUtil.phone()}
                            isOpen={isOpenLottery}
                            anchor="bottom"
                            className="lottery-drawer"
                            onClose={() => {
                                this.setState({
                                    isOpenLottery: false,
                                });
                            }}
                        >
                            {user &&
                                course &&
                                course.activity_lottery && (
                                    <LotteryCoupon
                                        user_id={user.id}
                                        course_id={course.id}
                                        activity_id={course.activity_lottery.id}
                                    />
                                )}
                        </CDrawer>
                    </div>
                </div>
                <Footer isShow={!uaUtil.mobile()} />
            </React.Fragment>
        );
    }
}

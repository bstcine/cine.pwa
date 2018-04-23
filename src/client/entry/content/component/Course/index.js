import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as Service from '@/service/content';
import {getParam, removeParam} from '@/util/urlUtil';
import {initWechat, setShareParam} from '@/util/wechatUtil';
import storeUtil from '@/util/storeUtil';
import Bridge from '@/util/bridge';
import BRIDGE_EVENT from '@/constant/bridgeEvent';
import {createShare, share} from '@/util/shareUtil';
import {eventEmmiter} from '@/util/eventEmmiter';
import siteCodeUtil from '@/util/sitecodeUtil';
import uaUtil from '@/util/uaUtil';
import routeUtil from '@/util/routeUtil';
import errorMsg from '@/util/errorMsg';

import LoginModal from '@/component/LoginModal';
import Header from '@/component/Header';
import Brief from './Brief';
import DetailDesc from './DetailDesc';
import CouponModal from './CouponModal';
import RecommendModal from './RecommendModal';
import Api from '../../../../../APIConfig';
import * as BaseService from '@/service/base';
import {fetchData} from '@/service/base';
import cCourseAction from '@/action/contentAction';


export default class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoginModal: false,
            showCouponModal: false,
            showRecommendModal: false,
            course: null,
            comments: [],
            coupon: null,
            user: null
        };
        this.handleBuy = this.handleBuy.bind(this);
        this.handleLearn = this.handleLearn.bind(this);
        this.handleShare = this.handleShare.bind(this);
        this.handleGetCoupon = this.handleGetCoupon.bind(this);
        this.handleOpenRecommend = this.handleOpenRecommend.bind(this);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.initData = this.initData.bind(this);
        this.login = this.login.bind(this);
        this.relatedCourse = this.relatedCourse.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.toggleRecommendModal = this.toggleRecommendModal.bind(this);
        this.toggleCouponModal = this.toggleCouponModal.bind(this);
        this.getUserName = this.getUserName.bind(this);
    }


    async componentDidMount() {
        if (siteCodeUtil.inIOSAPP()) {
            Bridge.ios(BRIDGE_EVENT.TIMELINE, {type: 'loaded'});
        }
        window.scroll(0, 0);
        document.title = '课程详情';

        eventEmmiter.on(BRIDGE_EVENT.OUTER_SHARE, () => {
            this.handleShare(false);
        });

        this.initCurrentPageWechat();
        await this.initData();


        if (siteCodeUtil.inIOSAPP()) {
            Bridge.ios(BRIDGE_EVENT.TIMELINE, {type: 'visible'});
        }
        BaseService.accessLog();
    }

    initCurrentPageWechat() {
        initWechat().then(async status => {
            if (status) {
                let {cid, source_user_id, sharelog_id} = getParam();
                if (sharelog_id) return;
                let [err, result] = await createShare({type: 4, cid, source_user_id});
                if (err) return alert(errorMsg(err));
                console.log('initWechat', result);
                let {share_title, share_link, share_imgUrl, share_desc} = result;
                setShareParam({
                    title: share_title,
                    link: removeParam(share_link, ['token', 'share_mask']),
                    imgUrl: share_imgUrl,
                    desc: share_desc
                });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        const locationChanged = nextProps.location !== this.props.location;
        if (locationChanged) {
            this.initCurrentPageWechat();
            this.initData();
        }
    }

    async initData() {
        let {cid} = getParam();
        let courseProm = fetchData(Api.APIURL_Content_Course_Detail, {cid})
            .then(([err, result]) => {
                if (err) return Promise.reject(err);
                return Promise.resolve(result.detail);
            });
        let commentsProm = fetchData(Api.APIURL_Content_Course_Comment, {cid})
            .then(([err, result]) => {
                if (err) return Promise.reject(err);
                return Promise.resolve(result);
            });
        let userProm = fetchData(Api.APIURL_User_Info, {})
            .then(([err, result]) => {
                if (err) return Promise.resolve();
                return Promise.resolve(result);
            });
        return Promise.all([courseProm, commentsProm, userProm]).then(([course, comments, user]) => {
            this.setState({course, comments, user});
        });
    }

    handleBuy() {
        if (!this.state.user) {
            this.login();
            return;
        }
        let {cid, source_user_id} = getParam();
        if (siteCodeUtil.inIOSAPP()) {
            Bridge.ios(BRIDGE_EVENT.PRE_CONFIRM, {course_id: cid});
        } else if (siteCodeUtil.inAndroidAPP()) {
            Bridge.android(BRIDGE_EVENT.PRE_CONFIRM, {course_id: cid});
        } else {
            let url = `/pay/prepare?cid=${cid}`;
            if (source_user_id) {
                url += `&source_user_id=${source_user_id}`;
            }
            // this.props.history.push(url);
            location.href = url;
        }
    }

    handleLearn() {
        let {course} = this.state;
        if (siteCodeUtil.inIOSAPP()) {
            Bridge.ios(BRIDGE_EVENT.LEARN, {
                course_id: course.id,
                last_lesson_id: course.last_content_id,
                course_name: course.name
            });
        } else if (siteCodeUtil.inAndroidAPP()) {
            Bridge.android(BRIDGE_EVENT.LEARN, {
                course_id: course.id,
                last_lesson_id: course.last_content_id,
                course_name: course.name
            });
        } else {
            location.href = `/learn`;
        }
    }

    async login() {
        if (siteCodeUtil.inIOSAPP()) {
            let {token} = await Bridge.ios(BRIDGE_EVENT.LOGIN);
            storeUtil.setToken(token);
            this.onLoginSuccess(token);
        } else if (siteCodeUtil.inAndroidAPP()) {
            let {token} = await Bridge.android(BRIDGE_EVENT.LOGIN);
            storeUtil.setToken(token);
            this.onLoginSuccess(token);
        } else {
            this.toggleLoginModal();
        }
    }

    async onLoginSuccess() {
        // alert(`token ${token}`);
        this.setState({showLoginModal: false});
        this.initData();
    }

    async handleShare(need_login = true, type = 4) {
        if (need_login && !this.state.user) {
            this.login();
            return;
        }
        let {cid, source_user_id} = getParam();
        let [err, result] = await createShare({type, cid, source_user_id});
        if (err) return alert(errorMsg(err));
        let {sharelog_id, share_title, share_link, share_imgUrl, share_desc} = result;
        let share_params = {
            sharelog_id: sharelog_id,
            title: share_title,
            link: share_link,
            imgUrl: share_imgUrl,
            desc: share_desc
        };
        share({share_params}).then(res => {
            console.log(JSON.stringify(res));
            if (res.status) {
                this.initData();
            }
        });
    }

    toggleLoginModal() {
        this.setState(prevState => ({
            showLoginModal: !prevState.showLoginModal
        }));
    }

    handleOpenRecommend() {
        this.toggleRecommendModal();
    }

    toggleRecommendModal() {
        this.setState(prevState => ({
            showRecommendModal: !prevState.showRecommendModal
        }));
    }

    toggleCouponModal() {
        this.setState(prevState => ({
            showCouponModal: !prevState.showCouponModal
        }));
    }

    getUserName(user) {
        if (!user) return '';
        return user.phone || user.email || user.login;
    }

    async handleGetCoupon() {
        if (!this.state.user) {
            this.login();
            return;
        }
        let {source_user_id} = getParam();
        if (!source_user_id) return alert('source_user_id is null');
        let [err, coupon] = await Service.createCoupon(source_user_id);
        if (err) return alert(errorMsg(err));
        this.setState({
            coupon,
            showCouponModal: true
        });
    }

    relatedCourse(related_lesson_id) {
        const {history} = this.props;
        routeUtil.goCourse({id: related_lesson_id}, history);
    }

    render() {
        let {course, user, comments, showLoginModal, showRecommendModal, showCouponModal} = this.state;
        let _courseSet = {
            setID: 'd011524109258308yWQTmzK5Bq',
            setName: '《神奇树屋》精读课程套餐（7册）',
            setOriginalPrice: 1180,
            setPromotePrice: 1060
        };

        //alert(cCourseAction)
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
                            onClickRecommend={this.handleOpenRecommend}
                            isShowRecommend={true}
                            onClickCoupon={this.handleGetCoupon}
                        />

                        {course ?
                            <DetailDesc
                                course={course}
                                courseSet={null}
                                courseComments={comments}
                                isIOSAPP={siteCodeUtil.inIOSAPP()}
                                onClickCourseSetLink = {cCourseAction.handleCourseSetLink}
                            />
                            : null }

                        <LoginModal
                            isOpen={showLoginModal}
                            toggleModal={this.toggleLoginModal}
                            onLoginSuccess={this.onLoginSuccess}
                        />
                        <RecommendModal
                            isOpen={showRecommendModal}
                            toggleModal={this.toggleRecommendModal}
                            onClickShare={this.handleShare}
                        />
                        <CouponModal
                            isOpen={showCouponModal}
                            toggleModal={this.toggleCouponModal}
                            username={this.getUserName(user)}
                            coupon={this.state.coupon}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as Service from '@/service/content';
import {getParam, removeParam} from '@/util/urlUtil';
import {initWechat, setShareParam} from '@/util/wechatUtil';
import storeUtil from '@/util/storeUtil';
import * as BaseService from '@/service/base';
import {Tabs, TabItems, TabItem, TabPanels, TabPanel} from '@/component/Tabs';
import LoginModal from '@/component/LoginModal';
import Brief from './Brief';
import Comments from './Comments';
import CouponModal from './CouponModal';
import RecommendModal from './RecommendModal';
import Bridge from '@/util/bridge';
import BRIDGE_EVENT from '@/constant/bridgeEvent';
import {createShare, share} from '@/util/shareUtil';
import {eventEmmiter} from '@/util/eventEmmiter';
import siteCodeUtil from '@/util/sitecodeUtil';
import Header from '@/component/Header';
import uaUtil from '@/util/uaUtil';
import timeUtil from '@/util/timeUtil';
import routeUtil from '@/util/routeUtil';
import Api from '../../../../../APIConfig';
import {fetchData} from '@/service/base';
import errorMsg from '@/util/errorMsg';

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
        this.goBuy = this.goBuy.bind(this);
        this.clickShare = this.clickShare.bind(this);
        this.loginSuccess = this.loginSuccess.bind(this);
        this.initData = this.initData.bind(this);
        this.goLearn = this.goLearn.bind(this);
        this.login = this.login.bind(this);
        this.relatedCourse = this.relatedCourse.bind(this);
        this.handlerScroll = this.handlerScroll.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.toggleRecommendModal = this.toggleRecommendModal.bind(this);
        this.toggleCouponModal = this.toggleCouponModal.bind(this);
        this.getUserName = this.getUserName.bind(this);
        this.getCoupon = this.getCoupon.bind(this);
        this.openRecommend = this.openRecommend.bind(this);
    }

    handlerScroll() {
        let tabs = ReactDOM.findDOMNode(this.refs.tabs);
        let courseDetail = ReactDOM.findDOMNode(this.refs.courseDetail);
        let courseDetailOffset = courseDetail.getBoundingClientRect();
        let clazz = 'tab-fixed';
        if (courseDetailOffset.top < 0) {
            if (!tabs.classList.contains(clazz)) tabs.classList.add(clazz);
        } else {
            if (tabs.classList.contains(clazz)) tabs.classList.remove(clazz);
        }
    }

    async componentDidMount() {
        if (siteCodeUtil.inIOSAPP()) {
            Bridge.ios(BRIDGE_EVENT.TIMELINE, {type: 'loaded'});
        }
        window.scroll(0, 0);
        document.title = '课程详情';
        eventEmmiter.on(BRIDGE_EVENT.OUTER_SHARE, () => {
            this.clickShare(false);
        });
        this.initCurrentPageWechat();
        await this.initData();
        window.addEventListener('scroll', this.handlerScroll);
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

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handlerScroll);
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

        fetchData(Api.APIURL_Content_Course_Detail, {cid}).then(([err, result]) => {
            if (err) return alert(errorMsg(err));
            let {detail: course} = result;
            this.setState({course});
        });

        fetchData(Api.APIURL_Content_Course_Comment, {cid}).then(([err, result]) => {
            if (err) return alert(errorMsg(err));
            this.setState({comments: result});
        });

        fetchData(Api.APIURL_User_Info, {}).then(([err, result]) => {
            if (err) return;
            this.setState({user: result});
        });
    }

    goBuy() {
        if (!this.state.user) {
            this.login();
            return;
        }
        this.setState({
            pauseVideo: true
        });
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
            this.props.history.push(url);
        }
    }

    goLearn() {
        this.setState({
            pauseVideo: true
        });
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
            this.loginSuccess(token);
        } else if (siteCodeUtil.inAndroidAPP()) {
            let {token} = await Bridge.android(BRIDGE_EVENT.LOGIN);
            storeUtil.setToken(token);
            this.loginSuccess(token);
        } else {
            this.toggleLoginModal();
        }
    }

    async loginSuccess() {
        // alert(`token ${token}`);
        this.setState({showLoginModal: false});
        this.initData();
    }

    async clickShare(need_login = true, type = 4) {
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

    openRecommend() {
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

    async getCoupon() {
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
        let {course, user, comments, showLoginModal, showRecommendModal, showCouponModal, pauseVideo} = this.state;

        return (
            <React.Fragment>
                <Header isShow={!siteCodeUtil.inAPP() && !uaUtil.wechat()}/>
                <div className="container-fluid course-container-bg">
                    <div className="course-container">
                        <Brief
                            course={course}
                            user={user}
                            relatedCourse={this.relatedCourse}
                            login={this.login}
                            goLearn={this.goLearn}
                            goBuy={this.goBuy}
                            clickShare={this.clickShare}
                            getCoupon={this.getCoupon}
                            openRecommend={this.openRecommend}
                            isShowRecommend={true}
                            pauseVideo={pauseVideo}
                        />

                        <div className="course-detail" ref="courseDetail">
                            {course ? (
                                <Tabs ref="tabs">
                                    <TabItems>
                                        <TabItem>{course.object_type === '1' ? '课程概要' : '详情'}</TabItem>
                                        {course.object_type === '1' && !siteCodeUtil.inIOSAPP() ? (
                                            <TabItem>课程目录</TabItem>
                                        ) : null}
                                        <TabItem>{course.object_type === '1' ? '学员评价' : '评价'}</TabItem>
                                    </TabItems>
                                    <TabPanels>
                                        <TabPanel>
                                            <div
                                                className="course-feature"
                                                dangerouslySetInnerHTML={{__html: course.h5remark}}
                                            />
                                        </TabPanel>
                                        {course.object_type === '1' && !siteCodeUtil.inIOSAPP() ? (
                                            <TabPanel>
                                                {course.catalog ? (
                                                    <div
                                                        className="course-feature"
                                                        dangerouslySetInnerHTML={{__html: course.catalog}}
                                                    />
                                                ) : null}

                                                <div className="course-category">
                                                    <ul className="course-list">
                                                        {course.contents &&
                                                        course.contents.length &&
                                                        course.contents.map((course, i) => {
                                                            return (
                                                                <li key={i}>
                                                                    {course.name}
                                                                    <ul className="chapter-list">
                                                                        {course.children &&
                                                                        course.children.length &&
                                                                        course.children.map((chapter, i) => {
                                                                            return (
                                                                                <li key={i}>
                                                                                    {chapter.name}
                                                                                    <ul className="lesson-list">
                                                                                        {chapter.children &&
                                                                                        chapter.children
                                                                                            .length &&
                                                                                        chapter.children.map(
                                                                                            (lesson, i) => {
                                                                                                return (
                                                                                                    <li
                                                                                                        key={
                                                                                                            i
                                                                                                        }
                                                                                                    >
                                                                                                        {
                                                                                                            lesson.name
                                                                                                        }
                                                                                                        {lesson.duration ? (
                                                                                                            <span
                                                                                                                className="meta">
                                                                                                                            {timeUtil.durationFormat(
                                                                                                                                lesson.duration
                                                                                                                            )}
                                                                                                                        </span>
                                                                                                        ) : null}
                                                                                                    </li>
                                                                                                );
                                                                                            }
                                                                                        )}
                                                                                    </ul>
                                                                                </li>
                                                                            );
                                                                        })}
                                                                    </ul>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            </TabPanel>
                                        ) : null}
                                        <TabPanel>
                                            <Comments comments={comments}/>
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            ) : null}
                        </div>

                        <LoginModal
                            isOpen={showLoginModal}
                            toggleModal={this.toggleLoginModal}
                            loginSuccess={this.loginSuccess}
                        />
                        <RecommendModal
                            isOpen={showRecommendModal}
                            toggleModal={this.toggleRecommendModal}
                            clickShare={this.clickShare}
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

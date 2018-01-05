import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import * as Service from '@/service/content'
import {getParam} from "@/util/urlUtil";
import {initWechat} from "@/util/wechatUtil";
import * as storeUtil from "@/util/storeUtil";
import * as BaseService from '@/service/base'
import {Tabs, TabItems, TabItem, TabPanels, TabPanel} from '@/component/Tabs'
import LoginModal from '@/component/LoginModal'
import Brief from './Brief'
import Comments from './Comments'
import CouponModal from './CouponModal'
import RecommendModal from './RecommendModal'
import SITECODE from "@/constant/sitecode";
import Bridge from "@/util/bridge";
import BRIDGE_EVENT from "@/constant/bridgeEvent";
import {createShare, share} from "@/util/shareUtil";
import {eventEmmiter} from "@/util/eventEmmiter";
import 'material-icons'


export default class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoginModal: false,
            showCouponModal: false,
            showRecommendModal: false,
            course: {},
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
        let sitecode = storeUtil.get('sitecode');
        this.isInIOSAPP = sitecode === SITECODE.IOS || sitecode === SITECODE.IOS_IPHONE || sitecode === SITECODE.IOS_IPAD;
        this.isInAPP = !!sitecode
    }

    handlerScroll() {
        let tabs = ReactDOM.findDOMNode(this.refs.tabs);
        let courseDetail = ReactDOM.findDOMNode(this.refs.courseDetail);
        let courseDetailOffset = courseDetail.getBoundingClientRect();
        let clazz = 'tab-fixed';
        if (courseDetailOffset.top < 0) {
            if (!tabs.classList.contains(clazz))
                tabs.classList.add(clazz)
        } else {
            if (tabs.classList.contains(clazz))
                tabs.classList.remove(clazz)
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handlerScroll);
        eventEmmiter.on(BRIDGE_EVENT.OUTER_SHARE, () => {
            this.clickShare(false)
        });

        this.initData()
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handlerScroll);
    }

    initData() {
        let param = getParam();
        let cid = param.cid;
        let token = storeUtil.getToken();
        Service.getContentCourseDetail({cid}).then(course => {
            this.setState({
                course: course
            })
        });
        Service.getContentCourseComment({cid}).then(comments => {
            this.setState({
                comments: comments
            })
        });
        BaseService.userInfo(token).then(user => {
            this.setState({
                user: user
            })
        });
        initWechat()
    }

    goBuy() {
        if (!this.state.user) {
            this.login();
            return
        }
        let param = getParam();
        let cid = param.cid;
        let source_user_id = param.source_user_id;
        let sitecode = storeUtil.get('sitecode');
        if (sitecode === SITECODE.ANDROID_PHONE || sitecode === SITECODE.ANDROID_PAD || sitecode === SITECODE.ANDROID) {
            Bridge.android(BRIDGE_EVENT.PRE_CONFIRM, {course_id: cid})
        } else if (sitecode === SITECODE.IOS || sitecode === SITECODE.IOS_IPHONE || sitecode === SITECODE.IOS_IPAD) {
            Bridge.ios(BRIDGE_EVENT.PRE_CONFIRM, {course_id: cid})
        } else {
            let url = `/confirmorder?lesson_id=${cid}`;
            if (source_user_id) {
                url += `&source_user_id=${source_user_id}`
            }
            location.href = url
        }
    }

    goLearn() {
        let sitecode = storeUtil.get('sitecode');
        if (sitecode === SITECODE.ANDROID_PHONE || sitecode === SITECODE.ANDROID_PAD || sitecode === SITECODE.ANDROID) {
            Bridge.android(BRIDGE_EVENT.LEARN)
        } else if (sitecode === SITECODE.IOS || sitecode === SITECODE.IOS_IPHONE || sitecode === SITECODE.IOS_IPAD) {
            Bridge.ios(BRIDGE_EVENT.LEARN)
        } else {
            location.href = `/learn`
        }
    }

    async login() {
        let sitecode = storeUtil.get('sitecode');
        // alert(`sitecode ${sitecode}`);
        if (sitecode === SITECODE.ANDROID_PHONE || sitecode === SITECODE.ANDROID_PAD || sitecode === SITECODE.ANDROID) {
            let {token} = await Bridge.android(BRIDGE_EVENT.LOGIN);
            storeUtil.setToken(token);
            this.loginSuccess(token)
        } else if (sitecode === SITECODE.IOS || sitecode === SITECODE.IOS_IPHONE || sitecode === SITECODE.IOS_IPAD) {
            let {token} = await Bridge.ios(BRIDGE_EVENT.LOGIN);
            // alert(`login--token ${token}`);
            storeUtil.setToken(token);
            this.loginSuccess(token)
        } else {
            this.toggleLoginModal()
        }
    }

    async loginSuccess() {
        // alert(`token ${token}`);
        this.setState({
            showLoginModal: false
        });
        this.initData()
    }

    async clickShare(need_login = true, type = 4) {
        if (need_login && !this.state.user) {
            this.login();
            return
        }
        let res = await createShare({type, cid: getParam().cid});
        // alert(JSON.stringify(res))
        let data = res.result;
        let share_params = {
            sharelog_id: data.sharelog_id,
            title: data.share_title,
            link: data.share_link,
            imgUrl: data.share_imgUrl,
            desc: data.share_desc
        };
        share({share_params}).then((res) => {
            console.log(JSON.stringify(res));
            if (res.status) {
                this.initData()
            }
        })
    }

    toggleLoginModal() {
        this.setState(prevState => ({
            showLoginModal: !prevState.showLoginModal
        }))
    }

    toggleRecommendModal() {
        this.setState(prevState => ({
            showRecommendModal: !prevState.showRecommendModal
        }))
    }

    toggleCouponModal() {
        this.setState(prevState => ({
            showCouponModal: !prevState.showCouponModal
        }))
    }

    getUserName(user) {
        if (!user) return "";
        return user.phone || user.email || user.login
    }

    async getCoupon() {
        let source_user_id = getParam().source_user_id;
        if (!source_user_id) return alert('source_user_id is null');
        let coupon = await Service.createCoupon(source_user_id);
        this.setState({
            coupon,
            showCouponModal: true
        })
    }

    relatedCourse(related_lesson_id) {
        const {history} = this.props;
        const course_id = related_lesson_id;
        let sitecode = storeUtil.get('sitecode');
        if (sitecode === SITECODE.IOS
            || sitecode === SITECODE.IOS_IPHONE
            || sitecode === SITECODE.IOS_IPAD) {
            Bridge.ios(BRIDGE_EVENT.COURSE, {course_id}, false)
        } else if (sitecode === SITECODE.ANDROID
            || sitecode === SITECODE.ANDROID_PHONE
            || sitecode === SITECODE.ANDROID_PAD) {
            Bridge.android(BRIDGE_EVENT.COURSE, {course_id}, false)
        } else {
            if (/^\/content\//i.test(location.pathname)) {
                history.push(`/course?cid=${course_id}`)
            } else {
                location.href = `/content/course?cid=${course_id}`
            }
        }
    }

    durationFormat(duration) {
        var sec_num = parseInt(duration, 10);
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return hours + ':' + minutes + ':' + seconds;
    }

    componentWillReceiveProps(nextProps) {
        const locationChanged = nextProps.location !== this.props.location;
        if (locationChanged) this.initData()
    }

    render() {
        let {course, user, comments, showLoginModal, showRecommendModal, showCouponModal} = this.state;

        return (
            <div className="course-container">
                <LoginModal isOpen={showLoginModal} toggleModal={this.toggleLoginModal}
                            loginSuccess={this.loginSuccess}/>
                <Brief course={course} user={user}
                       relatedCourse={this.relatedCourse}
                       login={this.login}
                       goLearn={this.goLearn}
                       goBuy={this.goBuy}
                       clickShare={this.clickShare}
                       getCoupon={this.getCoupon}
                       toggleRecommendModal={this.toggleRecommendModal}
                />
                <RecommendModal isOpen={showRecommendModal} toggleModal={this.toggleRecommendModal}
                                clickShare={this.clickShare}/>
                <CouponModal isOpen={showCouponModal} toggleModal={this.toggleCouponModal}
                             username={this.getUserName(user)} coupon={this.state.coupon}/>

                <div className="course-detail" ref="courseDetail">
                    <Tabs ref="tabs">
                        <TabItems>
                            <TabItem>
                                {course.object_type === '1' ? '课程概要' : '详情'}
                            </TabItem>
                            {course.object_type === '1' && !this.isInIOSAPP ? <TabItem>课程目录</TabItem> : null}
                            <TabItem>{course.object_type === '1' ? '学员评价' : '评价'}</TabItem>
                        </TabItems>
                        <TabPanels>
                            <TabPanel>
                                <div className="course-feature"
                                     dangerouslySetInnerHTML={{__html: course.h5remark}}/>

                            </TabPanel>
                            {
                                course.object_type === '1' && !this.isInIOSAPP ?
                                    <TabPanel>
                                        {course.catalog ?
                                            <div className="course-feature"
                                                 dangerouslySetInnerHTML={{__html: course.catalog}}/>
                                            : null
                                        }

                                        <div className="course-category">
                                            <ul className="course-list">
                                                {
                                                    course.contents.map((course, i) => {
                                                        return (
                                                            <li key={i}>
                                                                {course.name}
                                                                <ul className="chapter-list">
                                                                    {
                                                                        course.children.map((chapter, i) => {
                                                                            return (
                                                                                <li key={i}>
                                                                                    {chapter.name}
                                                                                    <ul className="lesson-list">
                                                                                        {
                                                                                            chapter.children.map((lesson, i) => {
                                                                                                return (
                                                                                                    <li key={i}>
                                                                                                        {lesson.name}
                                                                                                        {
                                                                                                            lesson.duration ?
                                                                                                                <span
                                                                                                                    className="meta">{this.durationFormat(lesson.duration)}</span>
                                                                                                                : null
                                                                                                        }
                                                                                                    </li>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </ul>
                                                                                </li>
                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </TabPanel>
                                    : null
                            }
                            <TabPanel>
                                <Comments comments={comments}/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </div>
        )
    }
}
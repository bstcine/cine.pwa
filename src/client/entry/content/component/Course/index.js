import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import * as Service from '@/service/content'
import {getParam} from "@/util/urlUtil";
import {initWechat} from "@/util/wechatUtil";
import * as storeUtil from "@/util/storeUtil";
import * as BaseService from '@/service/base'
import {Tabs, TabItems, TabItem, TabPanels, TabPanel} from '@/component/Tabs'
import Brief from './Brief'
import Comments from './Comments'
import SITECODE from "@/constant/sitecode";
import Bridge from "@/util/bridge";
import BRIDGE_EVENT from "@/constant/bridgeEvent";
import {createShare, share} from "@/util/shareUtil";
import {eventEmmiter} from "@/util/eventEmmiter";

export default class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: {},
            comments: [],
            user: null
        };
        this.goBuy = this.goBuy.bind(this);
        this.clickShare = this.clickShare.bind(this);
        this.initData = this.initData.bind(this);
        this.goLearn = this.goLearn.bind(this);
        this.login = this.login.bind(this);
        this.relatedCourse = this.relatedCourse.bind(this);
        this.handlerScroll = this.handlerScroll.bind(this);
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
        })

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
        let param = getParam();
        let cid = param.cid;
        let sitecode = storeUtil.get('sitecode');
        if (sitecode === SITECODE.ANDROID_PHONE || sitecode === SITECODE.ANDROID_PAD || sitecode === SITECODE.ANDROID) {
            Bridge.android(BRIDGE_EVENT.PRE_CONFIRM, {course_id: cid})
        } else if (sitecode === SITECODE.IOS || sitecode === SITECODE.IOS_IPHONE || sitecode === SITECODE.IOS_IPAD) {
            Bridge.ios(BRIDGE_EVENT.PRE_CONFIRM, {course_id: cid})
        } else {
            location.href = `/confirmorder?lesson_id=${cid}`
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
        alert(`sitecode ${sitecode}`);
        if (sitecode === SITECODE.ANDROID_PHONE || sitecode === SITECODE.ANDROID_PAD || sitecode === SITECODE.ANDROID) {
            let {token} = await Bridge.android(BRIDGE_EVENT.LOGIN);
            storeUtil.setToken(token);
            let user = await BaseService.userInfo(token);
            this.setState({
                user: user
            })
        } else if (sitecode === SITECODE.IOS || sitecode === SITECODE.IOS_IPHONE || sitecode === SITECODE.IOS_IPAD) {
            let {token} = await Bridge.ios(BRIDGE_EVENT.LOGIN);
            alert(`login--token ${token}`);
            storeUtil.setToken(token);
            alert(`token ${token}`);
            let user = await BaseService.userInfo(token);
            alert(user)
            this.setState({
                user: user
            })
        } else {
            let url = encodeURIComponent(`/content/course?cid=${getParam().cid}`);
            let host = location.host;
            location.href = location.protocol + '//' + host + '/login?go=' + url
        }

    }

    async clickShare(need_login = true) {
        // todo: ios分享回调
        if (need_login && !this.state.user) {
            this.login();
            return
        }
        let res = await createShare({type: 4, cid: getParam().cid});
        alert(JSON.stringify(res))
        let data = res.result;
        let share_params = {
            sharelog_id: data.sharelog_id,
            title: data.share_title,
            link: data.share_link,
            imgUrl: data.share_imgUrl,
            desc: data.share_desc
        };
        share({share_params}).then((res) => {
            alert(JSON.stringify(res));
            this.initData()
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


    componentWillReceiveProps(nextProps) {
        const locationChanged = nextProps.location !== this.props.location;
        if (locationChanged) this.initData()
    }

    render() {
        let course = this.state.course;
        let user = this.state.user;
        return (
            <div className="course-container">
                <Brief course={course} user={user} relatedCourse={this.relatedCourse} login={this.login}
                       goLearn={this.goLearn} goBuy={this.goBuy} clickShare={this.clickShare}/>
                <div className="course-detail" ref="courseDetail">
                    <Tabs ref="tabs">
                        <TabItems>
                            <TabItem>
                                {course.object_type === '1' ? '课程概要' : '详情'}
                            </TabItem>
                            {course.object_type === '1' ? <TabItem>课程目录</TabItem> : ""}
                            <TabItem>{course.object_type === '1' ? '学员评价' : '评价'}</TabItem>
                        </TabItems>
                        <TabPanels>
                            <TabPanel>
                                <div className="course-feature"
                                     dangerouslySetInnerHTML={{__html: course.h5remark}}/>

                            </TabPanel>
                            {course.object_type === '1' ? <TabPanel>
                                <div className="course-feature"
                                     dangerouslySetInnerHTML={{__html: course.catalog}}/>
                            </TabPanel> : ""}
                            <TabPanel>
                                <Comments comments={this.state.comments}/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </div>
        )
    }
}
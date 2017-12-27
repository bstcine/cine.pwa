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

export default class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: {},
            user: null
        };
        this.clickBuy = this.clickBuy.bind(this);
        this.handlerScroll = this.handlerScroll.bind(this);
    }

    handlerScroll() {
        let tabItems = ReactDOM.findDOMNode(this.refs.tabItems);
        let courseDetail = ReactDOM.findDOMNode(this.refs.courseDetail);
        let courseDetailOffset = courseDetail.getBoundingClientRect();
        let clazz = 'tab-items-fixed'
        if (courseDetailOffset.y < 0) {
            if (!tabItems.classList.contains(clazz))
                tabItems.classList.add(clazz)
        } else {
            if (tabItems.classList.contains(clazz))
                tabItems.classList.remove(clazz)
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handlerScroll);
        let param = getParam();
        let cid = param.cid;
        let token = storeUtil.getToken();
        Service.getContentCourseDetail({cid}).then(course => {
            this.setState({
                course: course
            })
        });
        BaseService.userInfo(token).then(user => {
            this.setState({
                user: user
            })
        });
        initWechat()


    }


    componentWillUnmount() {
        window.removeEventListener('scroll', this.handlerScroll);
    }


    clickBuy() {
        let param = getParam();
        let cid = param.cid;
        let sitecode = storeUtil.get('sitecode');
        if (sitecode === SITECODE.CINE_ANDROID_PHONE || sitecode === SITECODE.CINE_ANDROID_PAD || sitecode === SITECODE.CINE_ANDROID) {
            Bridge.android(BRIDGE_EVENT.ANDROID_PRE_CONFIRM, {course_id: cid})
        } else if (sitecode === SITECODE.CINE_IOS || sitecode === SITECODE.CINE_IOS_IPHONE || sitecode === SITECODE.CINE_IOS_IPAD) {
            Bridge.ios(BRIDGE_EVENT.IOS_PRE_CONFIRM, {course_id: cid})
        } else {
            location.href = `/confirmorder?lesson_id=${cid}`
        }
    }

    render() {
        let course = this.state.course;
        let user = this.state.user;
        return (
            <div className="course-container">
                <div className="video-container">
                    <video className="content" src="http://www.bstcine.com/f/2017/07/06/141540516S48yNNt.mp4"
                           poster={'http://www.bstcine.com/f/'+course.img} controls></video>
                </div>
                <Brief course={course} user={user}/>
                <div className="course-detail" ref="courseDetail">
                    <Tabs>
                        <TabItems ref="tabItems">
                            <TabItem>课程特色</TabItem>
                            <TabItem>课程大纲</TabItem>
                            <TabItem>评价</TabItem>
                        </TabItems>
                        <TabPanels>
                            <TabPanel>
                                <div className="course-feature"
                                     dangerouslySetInnerHTML={{__html: course.h5remark}}></div>
                            </TabPanel>
                            <TabPanel>222</TabPanel>
                            <TabPanel>
                                <Comments/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>

                <div className="go-buy" onClick={this.clickBuy}>立即购买</div>
            </div>
        )
    }
}
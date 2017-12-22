import React, {Component} from 'react'
import * as Service from '@/service/content'
import {getParam, ignoreParams, updateUrl} from "@/util/urlUtil";
import {initWechat} from "@/util/wechatUtil";
import * as storeUtil from "@/util/storeUtil";
import * as BaseService from '@/service/base'
import {Tabs, TabItems, TabItem, TabPanels, TabPanel} from '@/component/Tabs'
import Brief from './Brief'
import Comments from './Comments'

export default class Course extends Component {
    constructor(props) {
        super(props)
        this.state = {
            course: {},
            user: null
        }
    }

    componentDidMount() {
        let param = getParam()
        let cid = param.cid
        let token = storeUtil.getToken()
        Service.getContentCourseDetail({cid}).then(course => {
            this.setState({
                course: course
            })
        })
        BaseService.userInfo(token).then(user => {
            this.setState({
                user: user
            })
        })
        initWechat()
    }

    render() {
        let course = this.state.course
        let user = this.state.user
        return (
            <div className="course-container">
                <div className="video-container">
                    <video className="content" src="http://www.bstcine.com/f/2017/07/06/141540516S48yNNt.mp4"
                           poster={require('../../asset/image/pic_gatsby@2x.png')} controls></video>
                </div>
                <Brief course={course} user={user}/>
                <div className="course-detail">
                    <Tabs>
                        <TabItems>
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

                <div className="go-buy">立即购买</div>
            </div>
        )
    }
}
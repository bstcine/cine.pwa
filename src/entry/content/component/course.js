import React, {Component} from 'react'
import * as Service from '@/service/content'
import {getParam, ignoreParams, updateUrl} from "@/util/urlUtil";
import Bridge from '@/util/bridge'
import * as SITECODE from '@/config/sitecode'
import {createShare, share} from "@/util/shareUtil";
import {initWechat} from "@/util/wechatUtil";
import * as storeUtil from "@/util/storeUtil";
import * as BaseService from '@/service/base'
import {Tabs, TabItems, TabItem, TabPanels, TabPanel} from '@/component/tabs'

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
                           poster={require('../asset/image/pic_gatsby@2x.png')} controls></video>
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

class Brief extends Component {
    constructor(props) {
        super(props)
        this.state = {
            course: {},
            user: null,
            shared: false
        }
        this.shareWithDiscount = this.shareWithDiscount.bind(this)
        this.login = this.login.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            course: nextProps.course,
            user: nextProps.user,
        })
    }

    async shareWithDiscount() {
        // todo: ios分享回调
        if (!this.state.user) {
            this.login()
            return
        }
        let res = await createShare({type: 4, cid: getParam().cid})
        let data = res.result
        let share_params = {
            sharelog_id: data.sharelog_id,
            title: data.share_title,
            link: data.share_link,
            imgUrl: data.share_imgUrl,
            desc: data.share_desc
        }
        share({share_params}).then((res) => {
            alert(JSON.stringify(res))
            this.setState({
                shared: true
            })
        })
    }

    async login() {
        try {
            let sitecode = storeUtil.get('sitecode');
            if (sitecode === SITECODE.CINE_ANDROID_PHONE || sitecode === SITECODE.CINE_ANDROID_PAD || sitecode === SITECODE.CINE_ANDROID) {
                let {token} = await Bridge.android('login')
                storeUtil.setToken(token)
                let user = await BaseService.userInfo(token)
                this.setState({
                    user: user
                })
            } else if (sitecode === SITECODE.CINE_IOS || sitecode === SITECODE.CINE_IOS_IPHONE || sitecode === SITECODE.CINE_IOS_IPAD) {
                let {token} = await Bridge.ios('login')
                alert(`login--token ${token}`)
                storeUtil.setToken(token)
                alert(`token ${token}`)
                let user = await BaseService.userInfo(token)
                this.setState({
                    user: user
                })
            } else {
                let url = encodeURIComponent(`/content/course?cid=${getParam().cid}`);
                let host = location.host
                location.href = location.protocol + '//' + host + '/login?go=' + url
            }
        } catch (err) {
            alert(err.message)
        }
    }

    render() {
        let course = this.state.course
        let user = this.state.user
        console.log(`user ${user}`)
        return (
            <div className="brief">
                <div className="title">{course.name}</div>
                <div className="slogan">泛读十本，不如精读一本</div>
                <div className="metas">
                    <span className="meta">授课老师：{course.author}</span>
                    <span className="meta">授课时长：{course.time_arrange}</span>
                </div>
                <div className="prices">
                    <span className="price">￥{course.price}</span>
                    <span className="old-price">原价：<span className="del">￥{course.price}</span></span>
                </div>
                <div className="promotes">
                    <div className="promote">
                        <div className="promote-label"><span className="bord-label">优惠</span></div>
                        <div className="promote-list">
                            {
                                this.state.shared ?
                                    <div className="promote-title after-share">成功分享，已分享30元优惠</div>
                                    :
                                    <div className="promote-title share"
                                         onClick={this.shareWithDiscount}>点此分享到朋友圈立减30元>></div>

                            }
                            <div className="promote-title">购买课程即可获得200元学习机专享优惠券</div>
                        </div>
                    </div>

                    <div className="promote">
                        <div className="promote-label"><span className="bord-label">积分</span></div>
                        <div className="promote-list">
                            {
                                user ?
                                    <div className="promote-title">当前积分{user.point}，可抵扣{user.point}元</div>
                                    :
                                    <div className="promote-title" onClick={this.login}>1积分抵扣1元钱，<span
                                        className="blue">登录</span><span
                                        className="grey">查看可抵扣金额</span></div>
                            }
                        </div>
                    </div>

                </div>
                <div className="notice">
                    <div className="label">公告</div>
                    <div className="detail-container">
                        <div className="detail">1、现货10套，先到先得 2、中国大陆地区顺丰包邮</div>
                    </div>
                </div>
            </div>
        )
    }
}

class Comments extends Component {
    constructor(props) {
        super(props);
        this.renderComments = this.renderComments.bind(this);
    }


    renderComments() {
        let comments = [
            {nickname: 'Ma****w', date: '08/31 10:13', detail: '优质英文精读课程，让我们这些生活在小镇的孩子也能享受到福利!!'},
            {nickname: 'DD****w', date: '08/31 10:13', detail: '语法视频真的超级棒！为你们打Call!'},
            {nickname: 'AA****w', date: '08/31 10:13', detail: '语法视频真的超级棒真的超级棒！为你们打Call!'},
            {nickname: 'BB****w', date: '08/31 10:13', detail: '真的超级棒!!!语法视频真的超级棒！为你们打Call!'},
            {nickname: 'CC****w', date: '08/31 10:13', detail: '语法视频真的超级棒！为你们打Call!为你们打Call为你们打Call为你们打Call!'},
        ]
        return comments.map((item, index) => {
            return (
                <div key={index} className="comment-item">
                    <div className="comment-meta">
                        <span className="nickname">{item.nickname}</span>
                        <span className="date">{item.date}</span>
                    </div>
                    <div className="comment-detail">
                        {item.detail}
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="comments">
                {this.renderComments()}
            </div>
        )
    }
}
import React, {Component} from 'react'
import {createShare, share} from "@/util/shareUtil";
import * as storeUtil from "@/util/storeUtil";
import {getParam} from "@/util/urlUtil";
import Bridge from "@/util/bridge";
import * as BaseService from "@/service/base";
import SITECODE from "@/constant/sitecode";

export default class Brief extends Component {
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
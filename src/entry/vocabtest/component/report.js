import React from 'react';
import {getParam, updateUrl, ignoreParams} from '@/util/urlUtil'
import * as Service from '../service/index'
import * as storeUtil from '@/util/storeUtil'
import {initWechat} from '@/util/wechatUtil'
import {createShare, share} from '../../../util/shareUtil'
import * as SITECODE from '../../../config/sitecode'
import Bridge from "../../../util/bridge";

export default class Report extends React.Component {
    constructor(props) {
        super(props)
        console.log('Report constructor')
        this.state = {
            report: {},
            lessons: [],
            from_share: false
        }
        this.shareClick = this.shareClick.bind(this)
        this.retryClick = this.retryClick.bind(this)
        this.courseClick = this.courseClick.bind(this)
    }

    componentDidMount() {
        let id = getParam().id
        Service.queryContentWordResult({id}).then((res) => {
            this.setState({
                report: res.result.statsContentWord,
                lessons: res.result.recommendLessons,
                from_share: getParam().from_share === '1'
            })
        })
        initWechat()
    }

    async shareClick() {
        let res = await createShare({type: 7, share_link: updateUrl({from_share: 1}, ignoreParams(['token']))})
        let data = res.result
        let share_params = {
            sharelog_id: data.sharelog_id,
            title: data.share_title,
            link: data.share_link,
            imgUrl: data.share_imgUrl,
            desc: data.share_desc
        }
        share({share_params})
    }

    retryClick() {
        this.props.history.push(`/`)
    }

    courseClick(course_id) {
        let sitecode = storeUtil.get('sitecode');
        if (sitecode === SITECODE.CINE_IOS
            || sitecode === SITECODE.CINE_IOS_IPHONE
            || sitecode === SITECODE.CINE_IOS_IPAD) {
            Bridge.ios('course',{course_id},false)
        } else if (sitecode === SITECODE.CINE_ANDROID
            || sitecode === SITECODE.CINE_ANDROID_PHONE
            || sitecode === SITECODE.CINE_ANDROID_PAD) {
            Bridge.android('course',{course_id},false)
        } else {
            location.href = '/lesson/' + course_id
        }
    }

    renderRecommendList() {
        return this.state.lessons.map(lesson => {
            return (
                <div className="recommend-item" onClick={(e) => this.courseClick(lesson.id, e)} key={lesson.id}>
                    <div className="item-img" style={{
                        background: 'url(http://www.bstcine.com/f/' + lesson.img + ') no-repeat top center',
                        backgroundSize: 'cover'
                    }}></div>
                    <div className="item-brief">
                        <div className="item-title">{lesson.name}</div>
                        <div className="item-desc">学习课时：{lesson.time_arrange}</div>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="wrapper">
                <div className="report">
                    <div className="title">{this.state.from_share ? '词汇量为' : '你的词汇量为'}</div>
                    <div className="vocab">{this.state.report.vocab}</div>
                    <div className="line"></div>
                    <div className="recommend-title">各类考试所需词汇量参考数据：</div>
                    <ul className="recommend-detail">
                        <li>中考：1500</li>
                        <li>高考：3500</li>
                        <li>大学4级：4500</li>
                        <li>大学6级：6000</li>
                        <li>托福：8000</li>
                        <li>SAT：10000以上</li>
                    </ul>
                    <div className="recommend-title">{this.state.from_share ? '基于词汇量和年龄段，推荐以下课程：' : '基于你的词汇量和年龄段，推荐以下课程：'}</div>
                    <div className="recommend-list">
                        {this.renderRecommendList()}
                    </div>
                    <div className="recommend-title">
                        本结果为简版测试结果。<br/>
                        我们将在2周后提供更加详细的测试报告。
                    </div>

                </div>
                {
                    this.state.from_share ?
                        <div className="footer fixed">
                            <button onClick={this.retryClick} className="btn btn_sm btn_blue btn_try">我也测一下</button>
                        </div>
                        :
                        <div className="footer fixed">
                            <button onClick={this.retryClick} className="btn btn_sm btn_blue btn_try">再测一次</button>
                            <button onClick={this.shareClick} className="btn btn_sm btn_orange btn_share">分享</button>
                        </div>
                }
            </div>
        )
    }
}


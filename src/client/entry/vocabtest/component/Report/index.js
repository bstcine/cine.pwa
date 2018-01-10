import React, {Component} from 'react';
import {getParam, addParam, removeParam} from '@/util/urlUtil'
import * as Service from '@/service/vocabtest'
import storeUtil from '@/util/storeUtil'
import {initWechat} from '@/util/wechatUtil'
import {createShare, share} from '@/util/shareUtil'
import SITECODE from '@/constant/sitecode'
import Bridge from "@/util/bridge";
import BRIDGE_EVENT from "@/constant/bridgeEvent";

const echarts = require('echarts');


export default class Report extends Component {
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
        this.initPieChart = this.initPieChart.bind(this)
        this.setOption = this.setOption.bind(this)
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
        this.initPieChart()
    }


    componentDidUpdate(prevProps, prevState) {
        this.initPieChart();
    }


    async shareClick() {
        let res = await createShare({
            type: 7,
            share_link: addParam(null, removeParam(null, ['token']), {from_share: 1})
        })
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
        if (sitecode === SITECODE.IOS
            || sitecode === SITECODE.IOS_IPHONE
            || sitecode === SITECODE.IOS_IPAD) {
            Bridge.ios(BRIDGE_EVENT.COURSE, {course_id}, false)
        } else if (sitecode === SITECODE.ANDROID
            || sitecode === SITECODE.ANDROID_PHONE
            || sitecode === SITECODE.ANDROID_PAD) {
            Bridge.android(BRIDGE_EVENT.COURSE, {course_id}, false)
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

    initPieChart() {
        const { data } = this.props
        let myChart = echarts.init(this.refs.pieChart)
        let options = this.setOption([7, 18, 20, 35, 15, 5])
        myChart.setOption(options)
    }

//这是一个最简单的饼图~
    setOption(data) {
        return {
            itemStyle: {
                normal: {
                    // 阴影的大小
                    shadowBlur: 8,
                    // 阴影水平方向上的偏移
                    shadowOffsetX: 6,
                    // 阴影垂直方向上的偏移
                    shadowOffsetY: 0,
                    // 阴影颜色
                    shadowColor: 'rgba(67, 67, 67, .2)',

                    borderWidth: 2,
                    borderColor: '#fff'
                }
            },
            color:['#ffd941','#ffb138','#fe7f41','#34bcd9','#2d7be6','#65ce18'],
            legend: {
                // orient: 'vertical',
                // top: 'middle',
                bottom: 10,
                left: 'center',
                data: ['词汇量0-1500', '词汇量1500-3000','词汇量3000-4500','词汇量4500-6000','词汇量6000-7500','词汇量7500-9000']
            },
            series : [
                {
                    name: '比例',
                    type: 'pie',
                    data: data,
                    label: {
                        normal: {
                            position: 'inner',
                            formatter: "{d}% \n{b}",
                            color:'#fefefe',
                            fontSize: 12
                        }
                    }
                }
            ]
        }
    }

    renderPieChart() {
        return (
            <div className="pie-react">
                <div ref="pieChart" style={{width: "100%", height: "400px",margin:"auto"}}>
                </div>
            </div>
        )
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
                    {this.renderPieChart()}


                    <div
                        className="recommend-title">{this.state.from_share ? '基于词汇量和年龄段，推荐以下课程：' : '基于你的词汇量和年龄段，推荐以下课程：'}</div>
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


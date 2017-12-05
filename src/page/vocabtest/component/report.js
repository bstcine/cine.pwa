import React from 'react';
import * as util from 'common/util'
import * as Service from '../service/index'
import * as storeUtil from 'common/util/storeUtil'

export default class Report extends React.Component {
    constructor(props) {
        super(props)
        console.log('Report constructor')
        this.state = {
            report: {},
            lessons: []
        }
        this.shareClick = this.shareClick.bind(this)
        this.retryClick = this.retryClick.bind(this)
        this.courseClick = this.courseClick.bind(this)
    }

    componentDidMount() {
        let id = util.getParam().id
        Service.queryContentWordResult({id}).then((res) => {
            this.setState({
                report: res.result.statsContentWord,
                lessons: res.result.recommendLessons
            })
        })
    }

    shareClick() {
        let sitecode = storeUtil.get('sitecode');
        if (sitecode === 'cine.android') {
            try {
                Android.share('12312313123','《动物农庄》全新上线，积分双倍，快来！！！', '《动物农庄》分享描述分享描述分享描述', 'http://www.bstcine.com/lesson/42', 'http://www.bstcine.com/f/2017/11/12/084144524SvPCm7W.jpg')
            } catch (err) {
                alert(JSON.stringify(err))
            }
        } else {
            alert('TODO share')
        }
    }

    retryClick() {
        this.props.history.push(`/`)
    }

    courseClick(lesson_id) {
        let sitecode = util.getParam().sitecode;
        if (sitecode === 'cine.android') {
            try {
                Android.course(lesson_id)
            } catch (err) {
                alert(JSON.stringify(err))
            }
        } else {
            location.href = '/lesson/' + lesson_id
        }
    }

    renderRecommendList() {
        return this.state.lessons.map((lesson) => {
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
                    <div className="title">你当前的词汇量约为</div>
                    <div className="vocab">{this.state.report.vocab}</div>
                    <div className="line"></div>
                    <div className="recommend-title">根据你的词汇量，推荐适合你阅读的书单</div>
                    <div className="recommend-list">
                        {this.renderRecommendList()}
                    </div>
                </div>
                <div className="footer">
                    <button onClick={this.retryClick} className="btn btn_sm btn_blue btn_try">再测一次</button>
                    <button onClick={this.shareClick} className="btn btn_sm btn_orange btn_share">分享</button>
                </div>
            </div>
        )
    }
}


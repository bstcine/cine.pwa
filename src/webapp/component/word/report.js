import React from 'react';
import * as util from '../../util'
import * as Service from '../../service/word'

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
    }

    componentDidMount() {
        Service.queryContentWordResult({id: util.getUrlParam('id')}).then((result) => {
            this.setState({
                report: result.statsContentWord,
                lessons: result.recommendLessons
            })
        })
    }

    shareClick() {
        alert('TODO share')
    }

    retryClick() {
        this.props.history.push(`/welcome`)
    }

    renderRecommendList() {
        return this.state.lessons.map(function (lesson) {
            return <a href={'/lesson/'+ lesson.id}>
                        <div className="recommend-item" key={lesson.id}>
                            <div className="item-img" style={{
                                background: 'url(http://www.bstcine.com/f/' + lesson.img + ') no-repeat top center',
                                backgroundSize: 'cover'
                            }}></div>
                            <div className="item-brief">
                                <div className="item-title">{lesson.name}</div>
                                <div className="item-desc">学习课时：{lesson.time_arrange}</div>
                            </div>
                        </div>
                    </a>
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
                    <button onClick={this.shareClick} className="btn btn_sm btn_orange btn_share">分享
                    </button>
                </div>
            </div>
        )
    }
}


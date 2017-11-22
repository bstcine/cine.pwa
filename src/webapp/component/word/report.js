import React from 'react';
import * as util from '../../util'
import * as Service from '../../service/word'

export default class Report extends React.Component {
    constructor(props) {
        super(props)
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
        this.props.history.push(`/card`)
    }

    renderRecommendList() {
        return this.state.lessons.map(function (lesson) {
            return <div className="recommend_item">
                <div className="item_img" style={{
                    background: 'url(http://www.bstcine.com/f/' + lesson.img + ') no-repeat top center',
                    backgroundSize: 'cover'
                }}></div>
                <div className="item_brief">
                    <div className="item_title">{lesson.name}</div>
                    <div className="item_desc">学习课时：{lesson.time_arrange}</div>
                </div>
            </div>
        })
    }

    render() {
        return (
            <div className="wrapper">
                <div className="report">
                    <div className="title">你当前的词汇量约为</div>
                    <div className="vocab">{this.state.report.vocab}</div>
                    <div className="line"></div>
                    <div className="recommend_title">根据你的词汇量，推荐适合你阅读的书单</div>
                    <div className="recommend_list">
                        {this.renderRecommendList()}
                    </div>
                </div>
                <div className="footer">
                    <button onClick={this.retryClick} className="button button_sm button_blue button_try">再测一次</button>
                    <button onClick={this.shareClick} className="button button_sm button_orange button_share">分享
                    </button>
                </div>
            </div>
        )
    }
}


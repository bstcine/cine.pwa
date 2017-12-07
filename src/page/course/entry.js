import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom'
import LoginDetect from './component/loginDetect';
import * as Service from './service/index'
import {getParam} from 'common/util/urlUtil'
import './asset/style/index.less'

class Course extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('componentWillMount')

    }

    componentDidMount() {
        console.log('componentDidMount')
        const cid = getParam().cid
        Service.getContentCourseDetail({cid}).then((res)=>{
            this.setState({
                lesson:res.result.detail
            })
        })
    }

    render() {
        return (
            <div className="course-wrap">
                <div className="basic-wrap">
                    <div className="video">
                        <video src="http://www.bstcine.com/f/2017/07/06/141540516S48yNNt.mp4" poster={'http://www.bstcine.com/f/'+'2017/03/11/102106363SVEwqmp.jpg'}></video>
                    </div>
                    <div className="brief">
                        <div className="title">《了不起的盖茨比》-前三章精读课程</div>
                        <div className="slogan">泛读十本，不如精读一本</div>
                        <div className="metas">
                            <span className="meta">授课老师：邱巍楠</span>
                            <span className="meta">授课时长：16课时</span>
                        </div>
                        <div className="prices">
                            <div className="price">￥1250.00</div>
                            <div className="old-price">原价：￥1280</div>
                        </div>
                        <div className="promote">
                            <div className="bord-label">优惠</div>
                            <div className="promote-list">
                                <div className="promote-item share">点此分享到朋友圈立减30元>></div>
                                <div className="promote-item">购买课程即可获得200元学习机专享优惠券</div>
                            </div>
                        </div>
                        <div className="notice">
                            <div className="label">公告</div>
                            <div className="detail"> 1、现货10套，先到先得 2、中国大陆地区顺丰包邮</div>
                        </div>
                    </div>
                </div>
                <div className="detail-wrap">
                    <div className="detail-tabs">
                        <div className="detail-tab">课程特色</div>
                        <div className="detail-tab">课程大纲</div>
                        <div className="detail-tab">评价</div>
                    </div>
                    <div className="detail-content">
                        123123
                    </div>
                </div>
                <div className="go-buy">立即购买</div>
            </div>
        )
    }
}

ReactDOM.render(<Course/>, document.getElementById('root'))
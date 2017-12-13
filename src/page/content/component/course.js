import React from 'react'

export default class Course extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="course-container">
                <div className="course-showcase">
                    <div className="video-container">
                        <video className="content" src="http://www.bstcine.com/f/2017/07/06/141540516S48yNNt.mp4"
                               poster={require('../asset/image/pic_gatsby@2x.png')} controls></video>

                    </div>
                    <div className="brief">
                        <div className="title">《了不起的盖茨比》-前三章精读课程</div>
                        <div className="slogan">泛读十本，不如精读一本</div>
                        <div className="metas">
                            <span className="meta">授课老师：邱巍楠</span>
                            <span className="meta">授课时长：16课时</span>
                        </div>
                        <div className="prices">
                            <span className="price">￥1250.00</span>
                            <span className="old-price">原价：<span className="del">￥1280</span></span>
                        </div>
                        <div className="promotes">
                            <div className="promote">
                                <div className="promote-label"><span className="bord-label">优惠</span></div>
                                <div className="promote-list">
                                    <div className="promote-title share">点此分享到朋友圈立减30元>></div>
                                    <div className="promote-title">购买课程即可获得200元学习机专享优惠券</div>
                                </div>
                            </div>

                            <div className="promote">
                                <div className="promote-label"><span className="bord-label">积分</span></div>
                                <div className="promote-list">
                                    <div className="promote-title">1积分抵扣1元钱，<span className="blue">登录</span><span className="grey">查看可抵扣金额</span></div>
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
                </div>
                <div className="course-detail">
                    <div className="nav-tabs">
                        <div className="nav-item">课程特色</div>
                        <div className="nav-item">课程大纲</div>
                        <div className="nav-item">评价</div>
                    </div>
                    <div className="tabs-content">
                        <div className="tab-content">12312</div>
                        <div className="tab-content">123</div>
                        <div className="tab-content">1231</div>
                    </div>
                </div>
                <div className="go-buy">立即购买</div>
            </div>


        )
    }
}
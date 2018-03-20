import React, {Component} from 'react';
import {getParam} from '@/util/urlUtil';
import siteCodeUtil from '@/util/sitecodeUtil';
import Video from '@/component/Video';
import MediaPlayer from '../../../../component/MediaPlayer';

export default class Brief extends Component {
    static defaultProps = {
        course: null,
        user: null,
        isShowRecommend: false
    };

    constructor(props) {
        super(props);
    }

    //优惠列表
    renderActivityPromoteList(course) {
        if (course && course.activitys && course.activitys.length) {
            let list = course.activitys.map((activity, i) => {
                if (activity.filter === '1') {
                    return course.is_shared ? (
                        <div key={i} className="promote-title after-share">
                            {activity.share_after_desc}
                        </div>
                    ) : (
                        <div key={i} className="promote-title share pointer" onClick={this.props.clickShare}>
                            {activity.share_before_desc}
                        </div>
                    );
                } else {
                    return (
                        <div key={i} className="promote-title">
                            {activity.share_before_desc}
                        </div>
                    );
                }
            });
            return (
                <div className="promote">
                    <div className="promote-label">
                        <span className="bord-label">优惠</span>
                    </div>
                    <div className="promote-list">{list}</div>
                </div>
            );
        }
    }

    renderPointPromoteList(course, user) {
        if (course && course.is_allow_point === '1') {
            return (
                <div className="promote">
                    <div className="promote-label">
                        <span className="bord-label">积分</span>
                    </div>
                    <div className="promote-list">
                        {user ? (
                            <div className="promote-title">
                                当前积分{user.point}，可抵扣{user.point}元
                            </div>
                        ) : (
                            <div className="promote-title pointer" onClick={this.props.login}>
                                1积分抵扣1元钱，<span className="blue">登录</span>
                                <span className="grey">查看可抵扣金额</span>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
    }

    renderBottomButton(course) {
        const {goLearn, goBuy, clickShare} = this.props;
        if (course.status === '1') {
            if (course.is_paid) {
                if (siteCodeUtil.inIOSAPP()) return;
                if (siteCodeUtil.inAndroidAPP()) {
                    if (course.product_type === '1' && (course.object_type === '1' || course.object_type === '4')) {
                        return (
                            <button className="btn-action btn-learn" onClick={goLearn}>
                                立即学习
                            </button>
                        );
                    }
                } else {
                    if ((course.object_type === '1' || course.object_type === '4')) {
                        return (
                            <button className="btn-action btn-learn" onClick={goLearn}>
                                立即学习
                            </button>
                        );
                    }
                }
            } else {
                if (course.object_type === '1' || course.object_type === '2' || course.object_type === '3' || course.object_type === '5') {
                    return (
                        <button className="btn-action btn-buy" onClick={goBuy}>
                            立即购买
                        </button>
                    );
                } else if (course.object_type === '4') {
                    return (
                        <button className="btn-action btn-share" onClick={e => clickShare(true, 5)}>
                            分享开通
                        </button>
                    );
                }
            }
        } else if (course.status === '0' || course.status === '3') {
            return <button className="btn-action btn-down-sale">已下架</button>;
        }
    }

    renderMeta(course) {
        if (course && (course.author || course.time_arrange)) {
            let metas = [];
            if (course.author)
                metas.push(
                    <span key={course.author} className="meta">
                        授课老师：{course.author}
                    </span>
                );
            if (course.time_arrange)
                metas.push(
                    <span key={course.time_arrange} className="meta">
                        授课时长：{course.time_arrange}
                    </span>
                );
            return <div className="metas">{metas}</div>;
        }
    }

    renderPrices(course) {
        if (!course) return;
        if (course.status === '1') {
            if (isNaN(course.price)) {
                return (
                    <div className="prices">
                        <span className="price">{course.price}</span>
                    </div>
                );
            } else {
                if (course.original_price) {
                    return (
                        <div className="prices">
                            <span className="price">￥{course.activity_price}</span>
                            <span className="old-price">
                                原价：<span className="del">￥{course.original_price}</span>
                            </span>
                        </div>
                    );
                } else {
                    return (
                        <div className="prices">
                            <span className="price">￥{course.activity_price}</span>
                        </div>
                    );
                }
            }
        } else if (course.status === '2') {
            return <div className="coming-soon">待推出</div>;
        }
    }

    render() {
        let src = [{"id":"d0115166031413037ub5X8HMXD","type":"html","url":"http://oss.bstcine.com/kj/2017/02/14/104640445Smy5N2f.mp3","duration":293,"size":9387,"images":[{"time":"0","url":"http://oss.bstcine.com/img/A011481599400893DAhTPx3J6z/2017/02/09/160254520SYEnA9u.jpg?x-oss-process=image/watermark,text_YWRtaW4=,g_south,y_10,x_10"}]},{"id":"d011516603141305Ypcpgdz5s8","type":"html","url":"http://oss.bstcine.com/kj/2016/12/13/152333665StBPdBJ.mp3","duration":282,"size":8829,"images":[{"time":"0","url":"http://oss.bstcine.com/img/A011481599400893DAhTPx3J6z/2017/02/09/160357352SVknNwY.jpg?x-oss-process=image/watermark,text_YWRtaW4=,g_south,y_10,x_10"}]},{"id":"d011516603141307U9TesUTmCW","type":"html","url":"http://oss.bstcine.com/kj/2016/12/13/152336940SWCZepN.mp3","duration":75,"size":2375,"images":[{"time":"0","url":"http://oss.bstcine.com/img/A011481599400893DAhTPx3J6z/2017/02/09/160444628SzGP4GP.jpg?x-oss-process=image/watermark,text_YWRtaW4=,g_south,y_10,x_10"}]},{"id":"d011516603141309ypSzj60w6w","type":"html","url":"http://oss.bstcine.com/kj/2016/12/13/152343670S1xpcJS.mp3","duration":121,"size":3814,"images":[{"time":"0","url":"http://oss.bstcine.com/img/A011481599400893DAhTPx3J6z/2017/02/09/160518250SQPE5h6.jpg?x-oss-process=image/watermark,text_YWRtaW4=,g_south,y_10,x_10"}]},{"id":"d011516603141311T2Jb22vJad","type":"html","url":"http://oss.bstcine.com/kj/2016/12/13/152350423StdgRP8.mp3","duration":72,"size":2282,"images":[{"time":"0","url":"http://oss.bstcine.com/img/A011481599400893DAhTPx3J6z/2017/02/09/160608210SyQc869.jpg?x-oss-process=image/watermark,text_YWRtaW4=,g_south,y_10,x_10"}]},{"id":"d011516603141313Y2XjZahGAq","type":"html","url":"http://oss.bstcine.com/kj/2016/12/13/152401619SF9Ngn7.mp3","duration":96,"size":3024,"images":[{"time":"0","url":"http://oss.bstcine.com/img/A011481599400893DAhTPx3J6z/2017/02/09/160701431Sy1vNaC.jpg?x-oss-process=image/watermark,text_YWRtaW4=,g_south,y_10,x_10"}]},{"id":"d011516603141314agvwbNRxvJ","type":"html","url":"http://oss.bstcine.com/kj/2016/12/13/152410630S0hN8Zy.mp3","duration":114,"size":3582,"images":[{"time":"0","url":"http://oss.bstcine.com/img/A011481599400893DAhTPx3J6z/2017/02/09/160746284SKHtry0.jpg?x-oss-process=image/watermark,text_YWRtaW4=,g_south,y_10,x_10"}]},{"id":"d011516603141317F9d4raVfPY","type":"html","url":"http://oss.bstcine.com/kj/2016/12/13/152419121SbG5YPn.mp3","duration":90,"size":2839,"images":[{"time":"0","url":"http://oss.bstcine.com/img/A011481599400893DAhTPx3J6z/2017/02/09/160823882Sg0M4k8.jpg?x-oss-process=image/watermark,text_YWRtaW4=,g_south,y_10,x_10"}]},{"id":"d011516603141319ZSJrjuPgG8","type":"html","url":"http://oss.bstcine.com/kj/2016/12/13/152436187SbbtSpx.mp3","duration":110,"size":3442,"images":[{"time":"0","url":"http://oss.bstcine.com/img/A011481599400893DAhTPx3J6z/2017/02/09/16135943SVSkUKF.jpg?x-oss-process=image/watermark,text_YWRtaW4=,g_south,y_10,x_10"}]},{"id":"d011516603141321n9XQDV3fR8","type":"html","url":"http://oss.bstcine.com/kj/2016/12/13/152443516SVBHFZM.mp3","duration":38,"size":1213,"images":[{"time":"0","url":"http://oss.bstcine.com/img/A011481599400893DAhTPx3J6z/2017/02/09/161423968SJsXXxr.jpg?x-oss-process=image/watermark,text_YWRtaW4=,g_south,y_10,x_10"}]},{"id":"d011516603141323C0uDjjbr2d","type":"html","url":"http://oss.bstcine.com/kj/2016/12/13/152501426SRHw7fW.mp3","duration":83,"size":2606,"images":[{"time":"0","url":"http://oss.bstcine.com/img/A011481599400893DAhTPx3J6z/2017/02/09/161451133S4wC3Va.jpg?x-oss-process=image/watermark,text_YWRtaW4=,g_south,y_10,x_10"}]},{"id":"d011516603141325YjjdnZJ4BE","type":"html","url":"http://oss.bstcine.com/kj/2017/01/19/171246728SX62FQU.mp3","duration":92,"size":2885,"images":[{"time":"0","url":"http://oss.bstcine.com/img/A011481599400893DAhTPx3J6z/2017/02/09/161525182SpNU3Ez.jpg?x-oss-process=image/watermark,text_YWRtaW4=,g_south,y_10,x_10"}]}]
        let {course, user, relatedCourse, openRecommend, getCoupon, isShowRecommend, pauseVideo} = this.props;
        const {clickShare} = this.props;
        let source_user_id = getParam().source_user_id;
        return (
            <div className="brief-container">
                <div className="left-container">
                    <div className="video-container">
                        {course && course.video ? (
                            // <Video
                            //     src={course.video}
                            //     poster={course.img ? 'http://www.bstcine.com/f/' + course.img : null}
                            //     pauseVideo={pauseVideo}
                            // />
                            <MediaPlayer src={src} poster={course.img ? 'http://www.bstcine.com/f/' + course.img : null}/>
                        ) : null}
                        {course && !course.video ? (
                            <div
                                className="content"
                                style={{
                                    background: `url(${
                                        course.img ? 'http://www.bstcine.com/f/' + course.img : ''
                                    }) center center / cover no-repeat`
                                }}
                            />
                        ) : null}
                    </div>
                    {!siteCodeUtil.inAPP() ? (
                        <div className="share-tool">
                            分享
                            <ul className="share-icons">
                                <li
                                    style={{
                                        background: `url(${require('../../asset/image/ico_wechat.png')}) center center / contain no-repeat`
                                    }}
                                    onClick={e => clickShare(false)}
                                />
                            </ul>
                        </div>
                    ) : null}
                </div>

                <div className="desc-container">
                    <div className="desc-main">
                        {course?<div className="title">{course.name}</div>:null}

                        {course && course.subtitle ? <div className="slogan">{course.subtitle}</div> : null}

                        {course && course.related_lesson_id ? (
                            <div className="related-course">
                                <span onClick={e => relatedCourse(course.related_lesson_id, e)}>学习精读课程 >></span>
                            </div>
                        ) : null}

                        {this.renderMeta(course)}
                        {this.renderPrices(course)}

                        {course && ((course.activitys && course.activitys.length) || course.is_allow_point === '1') ? (
                            <div className="promotes">
                                {this.renderActivityPromoteList(course)}
                                {this.renderPointPromoteList(course, user)}
                            </div>
                        ) : null}

                        {course && course.notice ? (
                            <div className="notice">
                                <div className="label">公告</div>
                                <div className="notice-details" dangerouslySetInnerHTML={{__html: course.notice}} />
                            </div>
                        ) : null}
                    </div>

                    {course && this.renderBottomButton(course)}

                    {isShowRecommend ? (
                        <div className="right-desc">
                            {source_user_id ? (
                                <div className="get-coupon" onClick={getCoupon} />
                            ) : (
                                <div className="recommend" onClick={openRecommend}>
                                    <div className="red-bag" />
                                    <div className="desc">推荐得积分</div>
                                </div>
                            )}
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}

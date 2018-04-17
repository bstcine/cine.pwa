import React, {Component} from 'react';
import {getParam} from '@/util/urlUtil';
import siteCodeUtil from '@/util/sitecodeUtil';
// import Video from '@/component/Video';
import TryPlayer from '../../../../component/TryPlayer';

export default class Brief extends Component {
    static defaultProps = {
        course: null,
        user: null,
        isShowRecommend: false
    };

    // 优惠列表
    renderActivityPromoteList(course) {
        if (course && course.activitys && course.activitys.length) {
            let list = course.activitys.map((activity, i) => {
                if (activity.filter === '1') {
                    return course.is_shared ? (
                        <div key={i} className="promote-title after-share">
                            {activity.share_after_desc}
                        </div>
                    ) : (
                        <div key={i} className="promote-title share pointer" onClick={this.props.onClickShare}>
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

        const {onClickLearn, onClickBuy, onClickShare} = this.props;
        if (course.status === '1') {
            if (course.is_paid) {
                if (siteCodeUtil.inIOSAPP()) return;
                if (siteCodeUtil.inAndroidAPP()) {
                    if (course.product_type === '1' && (course.object_type === '1' || course.object_type === '4')) {
                        return (
                            <button className="btn-action btn-learn" onClick={onClickLearn}>
                                立即学习
                            </button>
                        );
                    }
                } else {
                    if (course.object_type === '1' || course.object_type === '4') {
                        return (
                            <button className="btn-action btn-learn" onClick={onClickLearn}>
                                立即学习
                            </button>
                        );
                    }
                }
            } else {
                if (
                    course.object_type === '1' ||
                    course.object_type === '2' ||
                    course.object_type === '3' ||
                    course.object_type === '5'
                ) {
                    return (
                        <button className="btn-action btn-buy" onClick={onClickBuy}>
                            立即购买
                        </button>
                    );
                } else if (course.object_type === '4') {
                    return (
                        <button className="btn-action btn-share" onClick={e => onClickShare(true, 5)}>
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
            if (course.author) {
                metas.push(
                    <span key={course.author} className="meta">
                        授课老师：{course.author}
                    </span>
                );
            }
            if (course.time_arrange) {
                metas.push(
                    <span key={course.time_arrange} className="meta">
                        授课时长：{course.time_arrange}
                    </span>
                );
            }
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
    renderVideoContainer(course) {
        if (!course) return <div className="video-container"/>;
        return (
            <div className="video-container">
                {course.try_contents && course.try_contents.length ? (
                    <div className="content">
                        <TryPlayer
                            playList={course.try_contents}
                            poster={course.img ? 'http://www.bstcine.com/f/' + course.img : null}
                        />
                    </div>
                ) : (
                    <div
                        className="content"
                        style={{
                            background: `url(${
                                course.img ? 'http://www.bstcine.com/f/' + course.img : ''
                            }) center center / cover no-repeat`
                        }}
                    />
                )}
            </div>
        );
    }

    render() {
        let {course, user, relatedCourse, onClickRecommend, isShowRecommend, onClickCoupon,} = this.props;
        const {onClickShare} = this.props;
        let source_user_id = getParam().source_user_id;
        return (
            <div className="brief-container">
                <div className="left-container">
                    {this.renderVideoContainer(course)}
                    {!siteCodeUtil.inAPP() ? (
                        <div className="share-tool">
                            分享
                            <ul className="share-icons">
                                <li
                                    style={{
                                        background: `url(${require('../../asset/image/ico_wechat.png')}) center center / contain no-repeat`
                                    }}
                                    onClick={e => onClickShare(false)}
                                />
                            </ul>
                        </div>
                    ) : null}
                </div>

                <div className="desc-container">
                    <div className="desc-main">
                        {course ? <div className="title">{course.name}</div> : null}

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
                                <div className="get-coupon" onClick={onClickCoupon} />
                            ) : (
                                <div className="recommend" onClick={onClickRecommend}>
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

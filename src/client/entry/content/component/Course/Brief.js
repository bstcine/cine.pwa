import React, { Component } from 'react';
import interSiteCodeUtil from '@/util/_base/interSiteCodeUtil';
import TryPlayer from '@/component/TryPlayer';
import CommonUtil from '@/util/_base/commonUtil';
import { CIcon } from '@/component/_base';
import QRHelp from '@/component/QRHelp';
import { getParam } from '@/util/_base/urlUtil';

export default class Brief extends Component {
    static defaultProps = {
        course: null,
        user: null,
    };

    static openHelp() {
        if (getParam().cid === 'd0115246233481413BmQb3rHwG') {
            QRHelp.open('alice');
        } else {
            QRHelp.open();
        }
    }

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
                        <div
                            key={i}
                            className="promote-title share pointer"
                            onClick={this.props.onClickShare}
                        >
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
                            <div
                                className="promote-title pointer"
                                onClick={this.props.login}
                            >
                                1积分抵扣1元钱，
                                <span className="blue">登录</span>
                                <span className="grey">查看可抵扣金额</span>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
    }

    renderBottomButton(course) {
        const { onClickLearn, onClickBuy, onClickShare } = this.props;
        if (course.status === '1') {
            if (course.is_paid) {
                if (interSiteCodeUtil.inIOSAPP()) return;
                if (interSiteCodeUtil.inAndroidAPP()) {
                    if (
                        course.product_type === '1' &&
                        (course.object_type === '1' ||
                            course.object_type === '4')
                    ) {
                        return (
                            <div className="btn-groups">
                                <button
                                    className="btn-action btn-learn"
                                    onClick={onClickLearn}
                                >
                                    立即学习
                                </button>
                            </div>
                        );
                    }
                } else {
                    if (
                        course.object_type === '1' ||
                        course.object_type === '4'
                    ) {
                        return (
                            <div className="btn-groups">
                                <button
                                    className="btn-action btn-learn"
                                    onClick={onClickLearn}
                                >
                                    立即学习
                                </button>
                            </div>
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
                        <div className="btn-groups">
                            <div
                                className="btn-feedback"
                                onClick={Brief.openHelp}
                            >
                                <CIcon>ci-message</CIcon>
                                <span>咨询</span>
                            </div>
                            <button
                                className="btn-action btn-buy"
                                onClick={onClickBuy}
                            >
                                立即购买
                            </button>
                        </div>
                    );
                } else if (course.object_type === '4') {
                    return (
                        <div className="btn-groups">
                            <div
                                className="btn-feedback"
                                onClick={Brief.openHelp}
                            >
                                <CIcon>ci-message</CIcon>
                                <span>咨询</span>
                            </div>
                            <button
                                className="btn-action btn-share"
                                onClick={e => onClickShare(true, 5)}
                            >
                                分享开通
                            </button>
                        </div>
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
                        录制老师：{course.author}
                    </span>
                );
            }
            if (course.time_arrange) {
                metas.push(
                    <span key={course.time_arrange} className="meta">
                        视频时长：{course.time_arrange}
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
                            <span className="price">
                                {CommonUtil.getCurrencySymbol(course.currency)}
                                {course.activity_price}
                            </span>
                            <span className="old-price">
                                原价：
                                <span className="del">
                                    {CommonUtil.getCurrencySymbol(
                                        course.currency
                                    )}
                                    {course.original_price}
                                </span>
                            </span>
                        </div>
                    );
                } else {
                    return (
                        <div className="prices">
                            <span className="price">
                                {CommonUtil.getCurrencySymbol(course.currency)}
                                {course.activity_price}
                            </span>
                        </div>
                    );
                }
            }
        } else if (course.status === '2') {
            return <div className="coming-soon">待推出</div>;
        }
    }
    renderVideoContainer(course) {
        if (!course || !course.img) return <div className="video-container" />;
        const imgHref = CommonUtil.getImageHref(course.img);
        const imgBackground = CommonUtil.getImageBackground(course.img);
        return (
            <div className="video-container">
                {course.try_contents && course.try_contents.length ? (
                    <div className="content">
                        <TryPlayer
                            playList={course.try_contents}
                            poster={course.img ? `${imgHref}` : null}
                        />
                    </div>
                ) : (
                    <div
                        className="content"
                        style={{
                            background: `${imgBackground}`,
                        }}
                    />
                )}
            </div>
        );
    }

    render() {
        let {
            course,
            user,
            relatedCourse,
            onClickLottery,
            openRecommend,
            getCoupon,
        } = this.props;
        const { onClickShare } = this.props;
        let source_user_id = getParam().source_user_id;
        return (
            <div className="brief-container">
                <div className="left-container">
                    {this.renderVideoContainer(course)}
                    {!interSiteCodeUtil.inAPP() ? (
                        <div className="share-tool">
                            分享
                            <ul className="share-icons">
                                <li
                                    style={{
                                        background: `url(${require('../../asset/image/ico_wechat.png')}) center center / contain no-repeat`,
                                    }}
                                    onClick={e => onClickShare(false)}
                                />
                            </ul>
                        </div>
                    ) : null}
                </div>

                <div className="desc-container">
                    <div className="desc-main">
                        {course ? (
                            <div className="title">{course.name}</div>
                        ) : null}

                        {course && course.subtitle ? (
                            <div className="slogan">{course.subtitle}</div>
                        ) : null}

                        {course && course.related_lesson_id ? (
                            <div className="related-course">
                                <span
                                    onClick={e =>
                                        relatedCourse(
                                            course.related_lesson_id,
                                            e
                                        )
                                    }
                                >
                                    学习精读课程 &gt;&gt;
                                </span>
                            </div>
                        ) : null}

                        {this.renderMeta(course)}
                        {this.renderPrices(course)}

                        {course && course.notice ? (
                            <div className="notice">
                                <div className="label">公告</div>
                                <div
                                    className="notice-details"
                                    dangerouslySetInnerHTML={{
                                        __html: course.notice,
                                    }}
                                />
                            </div>
                        ) : null}
                    </div>

                    {course && this.renderBottomButton(course)}

                    {course && course.activity_lottery && (
                        <div className="right-desc">
                            <div className="recommend" onClick={onClickLottery}>
                                <div className="red-bag" />
                                <div className="desc">
                                    抽取
                                    <br />
                                    优惠券
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="right-desc">

                    </div>
                </div>
            </div>
        );
    }
}

const TempFromZXTag = () => {
    return (
        <div className="promote">
            <div className="promote-label">
                <span className="bord-label">移动用户专享</span>
            </div>
            <div className="promote-list">
                <div className="promote-title">用券后 1792-800 = 992 元</div>
            </div>
        </div>
    );
};

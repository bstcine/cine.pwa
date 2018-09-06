import React, { Component } from 'react';
import '../../asset/style/achieve.less';

export default class Achieve extends Component {
    constructor(props, context) {
        super(props, context);
        this.ref = React.createRef();
    }

    render() {
        const {
            teacher,
            week,
            word,
            summary,
            video,
            writing,
            composition,
            img,
        } = this.props;
        if (img) return <img src={img} alt="" className="achieve__cav" />;
        return (
            <div className="achieve" ref={this.ref}>
                <div className="achieve__head">
                    <img
                        className="ach_slogan"
                        src={require('../../asset/image/share_logo.png')}
                    />
                    <div className="ach_tips">
                        <p>我已跟我的</p>
                        <p className="ach_tips__tea">
                            英文私塾导师<span>{teacher && teacher.name}</span>
                        </p>
                        <p>
                            学习了 <span className="bb">{week}</span> 周
                        </p>
                    </div>
                </div>
                <div className="achieve__content__container">
                    <div className="achieve__content">
                        <div className="myach">
                            <img
                                className="myach__img"
                                src={require('../../asset/image/txt_ach.png')}
                                alt=""
                            />
                            <div className="myach__list">
                                <div className="myach__item">
                                    <div className="myach__item_count">
                                        <span>{word}</span> 个
                                    </div>
                                    <div className="myach__item_name">
                                        <img
                                            src={require('../../asset/image/wordtest.png')}
                                            alt=""
                                        />
                                        <span> 生词</span>
                                    </div>
                                </div>
                                <div className="myach__item">
                                    <div className="myach__item_count">
                                        <span>{summary}</span> 个
                                    </div>
                                    <div className="myach__item_name">
                                        <img
                                            src={require('../../asset/image/grammar.png')}
                                            alt=""
                                        />
                                        <span> 语法点</span>
                                    </div>
                                </div>
                                <div className="myach__item">
                                    <div className="myach__item_count">
                                        <span>{video}</span> 分钟
                                    </div>
                                    <div className="myach__item_name">
                                        <img
                                            src={require('../../asset/image/ico_video.png')}
                                            alt=""
                                        />
                                        <span> 视频课件</span>
                                    </div>
                                </div>
                                <div className="myach__item">
                                    <div className="myach__item_count">
                                        <span>{writing}</span> 篇
                                    </div>
                                    <div className="myach__item_name">
                                        <img
                                            src={require('../../asset/image/ico_exercises.png')}
                                            alt=""
                                        />
                                        <span> 英文写作</span>
                                    </div>
                                </div>
                            </div>

                            <div className="myach__comp">
                                {composition && (
                                    <div className="myach__comp__title">
                                        上周作文题目：
                                    </div>
                                )}
                                {composition && (
                                    <div className="myach__comp__name">
                                        {composition}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mymentor">
                            <img
                                className="mymentor__img"
                                src={require('../../asset/image/txt_teacher.png')}
                                alt=""
                            />
                            <div className="mymentor__content">
                                <div className="mymentor__avator">
                                    <img
                                        src={teacher && teacher.head_img}
                                        alt=""
                                    />
                                    {teacher && teacher.name}
                                </div>
                                <div
                                    className="mymentor__desc"
                                    dangerouslySetInnerHTML={{
                                        __html: teacher && teacher.remark_share,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="achieve__footer">
                    <img
                        className="ach_qrcode__desc"
                        src={require('../../asset/image/bg_sharefoot.png')}
                    />
                    <img
                        className="ach_qrcode"
                        src={require('../../asset/image/qrcode.png')}
                    />
                </div>
            </div>
        );
    }
}

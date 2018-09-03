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
                        我已跟我的<span>
                            英文私塾导师{teacher && teacher.name}
                        </span>老师，<br />
                        学习了 <span>{week}</span> 周
                    </div>
                </div>

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
                            <div className="myach__comp__title">
                                上周作文题目：
                            </div>
                            <div className="myach__comp__name">
                                {composition}
                            </div>
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
                                    src="http://www.bstcine.com/f/2017/06/02/d0114963866104022gHFgcZ2H4.jpg"
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
                <div className="achieve__footer">
                    <img
                        className="ach_qrcode__desc"
                        src={require('../../asset/image/txt_scan.png')}
                    />
                    <img
                        className="ach_qrcode"
                        src={require('../../asset/image/qrcode_app.png')}
                    />
                </div>
            </div>
        );
    }
}
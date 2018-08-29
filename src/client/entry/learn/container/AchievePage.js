import React, { Component } from 'react';
import { CIcon } from '@/component/_base';
import html2canvas from 'html2canvas';
import '../asset/style/achieve.less';

export default class AchievePage extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        const ele = this.ref.current;
        html2canvas(ele, {
            useCORS: true,
        }).then(canvas => {
            document.getElementById('root').replaceChild(canvas, ele);
        });
    }

    render() {
        return (
            <div className="achieve" ref={this.ref}>
                <div className="achieve__head">
                    <img
                        className="ach_slogan"
                        src={require('../asset/image/share_logo.png')}
                    />
                    <div className="ach_tips">
                        我已跟我的<span>英文私塾导师赵晴</span>老师，<br />
                        学习了 <span>3</span> 周
                    </div>
                </div>

                <div className="achieve__content">
                    <div className="myach">
                        <img
                            className="myach__img"
                            src={require('../asset/image/txt_ach.png')}
                            alt=""
                        />
                        <div className="myach__list">
                            <div className="myach__item">
                                <div className="myach__item_count">
                                    <span>35</span> 个
                                </div>
                                <div className="myach__item_name">
                                    <CIcon>ci-test</CIcon> 生词
                                </div>
                            </div>
                            <div className="myach__item">
                                <div className="myach__item_count">
                                    <span>22</span> 个
                                </div>
                                <div className="myach__item_name">
                                    <CIcon>ci-grammar</CIcon> 语法点
                                </div>
                            </div>
                            <div className="myach__item">
                                <div className="myach__item_count">
                                    <span>90</span> 分钟
                                </div>
                                <div className="myach__item_name">
                                    <CIcon>ci-video</CIcon> 视频课件
                                </div>
                            </div>
                            <div className="myach__item">
                                <div className="myach__item_count">
                                    <span>3</span> 篇
                                </div>
                                <div className="myach__item_name">
                                    <CIcon>ci-exercises</CIcon> 英文写作
                                </div>
                            </div>
                        </div>

                        <div className="myach__comp">
                            <div className="myach__comp__title">
                                上周作文题目：
                            </div>
                            <div className="myach__comp__name">
                                The Annoyance Of Growing Up
                            </div>
                        </div>
                    </div>

                    <div className="mymentor">
                        <img
                            className="mymentor__img"
                            src={require('../asset/image/txt_teacher.png')}
                            alt=""
                        />
                        <div className="mymentor__avator">
                            <img
                                src="http://www.bstcine.com/f/2017/06/02/d0114963866104022gHFgcZ2H4.jpg"
                                alt=""
                            />
                            赵晴
                        </div>
                        <div className="mymentor__desc">
                            美国麻省大学教育学博士，西安外国语大学<br />
                            英语专业本科<br />
                            10年+英语教学经验<br />
                            现居波士顿
                        </div>
                    </div>
                </div>
                <div className="achieve__footer">
                    <img
                        className="ach_qrcode__desc"
                        src={require('../asset/image/txt_scan.png')}
                    />
                    <img
                        className="ach_qrcode"
                        src={require('../asset/image/qrcode_app.png')}
                    />
                </div>
            </div>
        );
    }
}

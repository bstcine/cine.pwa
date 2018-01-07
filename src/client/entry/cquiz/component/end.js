import React from 'react';
import storeUtil from '@/util/storeUtil';
import Bridge from "@/util/bridge";
import SITECODE from "@/constant/sitecode";

export default class End extends React.Component {
    constructor(props) {
        super(props);
        console.log('constructor');

        let score = props.score ? props.score : 0;

        let hint = '希望下次会更好！';
        let hintStyle = 'red';
        if (score >= 60 && score <= 79) {
            hint = '继续加油哦！';
            hintStyle = 'green';
        } else if (score >= 80 && score <= 99) {
            hint = '满分就在前方！';
            hintStyle = 'green';
        } else if (score == 100) {
            hint = '超级棒！继续保持！';
            hintStyle = 'green';
        }

        this.state = {score: score, hint: hint,hintStyle:hintStyle};

        this.exitQuiz = this.exitQuiz.bind(this);
        this.againLoad = this.againLoad.bind(this);
    }

    againLoad(){
        window.location.reload();
    }

    exitQuiz() {
        let sitecode = storeUtil.get('sitecode');
        if (sitecode === SITECODE.ANDROID_PHONE || sitecode === SITECODE.ANDROID_PAD || sitecode === SITECODE.ANDROID) {
            Bridge.android(Bridge.QUIZ_EXIT);
        } else if (sitecode === SITECODE.IOS || sitecode === SITECODE.IOS_IPHONE || sitecode === SITECODE.IOS_IPAD) {
            Bridge.ios(Bridge.QUIZ_EXIT);
        } else {
            alert('exit');
            console.log(Bridge.QUIZ_EXIT);
        }
    }

    render() {
        return (
            <div className="card-end">
                <div className="hint">本次测试得分：<span className={this.state.hintStyle}>{this.state.score}</span> 分，{this.state.hint}</div>

                <div className="todo">
                    <button className="again" onClick={this.againLoad}>再次一次</button>
                    <button className="exit" onClick={this.exitQuiz}>答题结束</button>
                </div>
            </div>
        );
    }
}
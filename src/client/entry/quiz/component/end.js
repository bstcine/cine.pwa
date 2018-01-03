import React from 'react';
import * as storeUtil from '@/util/storeUtil';
import Bridge from "@/util/bridge";
import SITECODE from "@/constant/sitecode";

export default class End extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.score);

        this.state = {score: props.score?props.score:0};
        this.exitQuiz = this.exitQuiz.bind(this);
    }

    exitQuiz(){
        let sitecode = storeUtil.get('sitecode');
        if (sitecode === SITECODE.ANDROID_PHONE || sitecode === SITECODE.ANDROID_PAD || sitecode === SITECODE.ANDROID) {
            Bridge.android('exit_quiz');
        } else if (sitecode === SITECODE.IOS || sitecode === SITECODE.IOS_IPHONE || sitecode === SITECODE.IOS_IPAD) {
            Bridge.ios('exit_quiz');
        } else {
            console.log('exit_quiz');
            window.parent.exit_quiz();
        }
    }

    render() {
        return (
            <div>
                <label>
                    本次测试得分：{this.state.score} 分，继续加油哟!
                </label>
                <button className="mui-btn mui-btn--primary" onClick={this.exitQuiz}>答题结束</button>
            </div>
        );
    }
}
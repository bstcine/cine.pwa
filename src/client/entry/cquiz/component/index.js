import React, {Component} from 'react';
import * as Service from '@/service/quiz'
import {getParam} from '@/util/urlUtil'
import * as storeUtil from '@/util/storeUtil'
import SITECODE from "@/constant/sitecode";

export default class Index extends Component {

    constructor(props) {
        super(props);
        console.log('constructor');

        this.quiz_id = storeUtil.get('quiz_id');
        this.quiz_title = storeUtil.get('quiz_title');

        this.toCard = this.toCard.bind(this);
    }

    componentDidMount() {
        if (this.quiz_id) {
            Service.getQuiz({id: this.quiz_id}).then(result => {
                console.log(result.data);
                this.quizList = result.data.data;
            })
        } else {
            let sitecode = storeUtil.get('sitecode');
            if (sitecode === SITECODE.ANDROID_PHONE || sitecode === SITECODE.ANDROID_PAD || sitecode === SITECODE.ANDROID) {
                Bridge.android(Bridge.INIT_QUIZ_DATA).then(res => {
                    if (res) this.quizList = JSON.parse(res);
                });
            } else if (sitecode === SITECODE.IOS || sitecode === SITECODE.IOS_IPHONE || sitecode === SITECODE.IOS_IPAD) {
                Bridge.ios(Bridge.INIT_QUIZ_DATA).then(res => {
                    if (res) this.quizList = JSON.parse(res);
                });
            } else {
                console.log(window.parent);
                let quizData = window.parent.cineQuizData;
                if (quizData) this.quizList = JSON.parse(quizData);
            }
        }
    }

    toCard() {
        if (this.quizList) {
            storeUtil.set('quiz_list', this.quizList);
            this.props.history.push('/card')
        } else {
            alert('no data!');
        }
    }

    render() {
        return (
            <div className="quiz-start">
                <div className="title">{this.quiz_title ? this.quiz_title : '小节测试'}</div>
                <div className="hint">学得怎么样了？来测一下吧！</div>
                <button onClick={this.toCard}>开始答题</button>
            </div>
        )
    }

}








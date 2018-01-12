import React, {Component} from 'react';
import * as Service from '@/service/quiz'
import storeUtil from '@/util/storeUtil'
import siteCodeUtil from "@/util/sitecodeUtil";
import Bridge from "@/util/bridge";
import BRIDGE_EVENT from "@/constant/bridgeEvent";

export default class Index extends Component {

    constructor(props) {
        super(props);
        console.log('constructor');

        this.quizId = storeUtil.get('quiz_id');
        this.quizIsOver = storeUtil.get('quiz_isOver');
        this.quizTitle = storeUtil.get('quiz_title');

        this.toCard = this.toCard.bind(this);
    }

    componentDidMount() {
        if (this.quizId) {
            Service.getQuiz({id: this.quizId}).then(result => {
                console.log(result.data);
                this.quizList = result.data.data;
                if (!this.quizIsOver) this.toCard();
            })
        } else {
            if (siteCodeUtil.inIOSAPP()) {
                Bridge.ios(BRIDGE_EVENT.INIT_QUIZ_DATA).then(res => {
                    if (res && res.data) {
                        console.log(res.data);
                        this.quizList = res.data;
                    }
                    if (!this.quizIsOver) this.toCard();
                });
            } else if (siteCodeUtil.inAndroidAPP()) {
                Bridge.android(BRIDGE_EVENT.INIT_QUIZ_DATA).then(res => {
                    if (res && res.data) {
                        console.log(res.data);
                        this.quizList = res.data;
                    }
                    if (!this.quizIsOver) this.toCard();
                });
            } else {
                console.log(window.parent);
                let quizData = window.parent.cineQuizData;
                if (quizData) {
                    this.quizList = JSON.parse(quizData);
                    if (!this.quizIsOver) this.toCard();
                }
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
        return (this.quizIsOver) ? <div className="quiz-start">
            <div className="title">{this.quizTitle ? this.quizTitle : '本章测试'}</div>
            <div className="hint">学得怎么样了？来测一下吧！</div>
            <button onClick={this.toCard}>开始答题</button>
        </div> : <div/>
    }

}








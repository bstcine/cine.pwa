import React, {Component} from 'react';
import * as Service from '@/service/quiz'
import {getParam} from '@/util/urlUtil'
import storeUtil from '@/util/storeUtil'
import {eventEmmiter} from "@/util/eventEmmiter";

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
            eventEmmiter.once('set_quiz_data', (res) => {
                console.log(res);
                if (res) {
                    res = JSON.parse(res);
                    this.quizList = res.data;
                }
            })
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








import React, {Component} from 'react';
import * as Service from '@/service/quiz'
import {getParam} from '@/util/urlUtil'
import * as storeUtil from '@/util/storeUtil'
import {eventEmmiter} from "@/util/eventEmmiter";

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.toCard = this.toCard.bind(this);

        let quiz_id = storeUtil.get('quiz_id');
        if(quiz_id){
            console.log(quiz_id);
            Service.getQuiz({id: quiz_id}).then(result => {
                console.log(result.data);
                this.quizList = result.data.data;
            })
        }else {
            eventEmmiter.once('load_quiz_list', (res) => {
                if (res) res = JSON.parse(res);
                console.log(res)
            })
        }
    }

    componentDidMount() {

    }

    toCard(){
        if(this.quizList){
            storeUtil.set('quiz_list',this.quizList);
            this.props.history.push('/card')
        }else {
            alert('quiz data is null');
        }
    }

    render() {
        return (
            <div className="quiz-start">
                <div className="title">《神奇树屋》精读课程 - Lesson 2 - 小节测试</div>
                <div className="hint">学得怎么样了？来测一下吧！</div>
                <button onClick={this.toCard}>开始答题</button>
            </div>
        )
    }

}








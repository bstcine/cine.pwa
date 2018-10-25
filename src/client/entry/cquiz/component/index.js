import React, { Component } from 'react';
import * as Service from '@/service/quiz';
import storeUtil from '@/util/storeUtil';
import siteCodeUtil from '@/util/sitecodeUtil';
import Bridge from '@/util/bridge';
import BRIDGE_EVENT from '@/constant/bridgeEvent';

export default class Index extends Component {
    constructor(props) {
        super(props);
        console.log('constructor');

        this.quizBar = storeUtil.get('quiz_bar');
        this.quizTitle = storeUtil.get('quiz_title');

        this.toCard = this.toCard.bind(this);
        if (this.quizBar) this.toCard();
    }

    toCard() {
        this.props.history.push('/card');
    }

    render() {
        return !this.quizBar ? (
            <div className="quiz-start">
                <div className="title">
                    {this.quizTitle ? this.quizTitle : '本课测验'}
                </div>
                <div className="hint">学得怎么样了？来测一下吧！</div>
                <button onClick={this.toCard}>开始答题</button>
            </div>
        ) : (
            <div />
        );
    }
}

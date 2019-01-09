import React, { Component } from 'react';
import storeUtil from '@/util/_base/storeUtil';

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
        this.props.history.push('/cquiz/card');
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

import React, { Component } from 'react';
import storeUtil from '@/util/_base/storeUtil';
import Bridge from '@/util/_base/interBridge';
import End from './end.js';
import interSiteCodeUtil from '@/util/_base/interSiteCodeUtil';
import BRIDGE_EVENT from '@/constant/bridgeEvent';
import * as Service from '@/service/quiz';

export default class Card extends Component {
    constructor(props) {
        super(props);
        console.log('constructor');

        this.state = {
            selectLog: [],
            index: 0,
            selectOption: -1,
            inputDisabled: false,
            isEnd: false,
            btnHint: '下一题',
        };

        this.dataList = [];
        this.optionName = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

        this.quizId = storeUtil.get('quiz_id');
        this.lessonId = storeUtil.get('lesson_id');
        this.quizBar = storeUtil.get('quiz_bar');

        this.init = this.init.bind(this);
        this.onChangRadio = this.onChangRadio.bind(this);
        this.onNextCard = this.onNextCard.bind(this);
        this.onAgainLoad = this.onAgainLoad.bind(this);
    }

    componentDidMount() {
        if (this.quizId || this.lessonId) {
            Service.getQuiz({ id: this.quizId, lesson_id: this.lessonId }).then(
                result => {
                    console.log(result.data);
                    this.dataList = result.data.data;
                    this.init();
                }
            );
        } else {
            if (interSiteCodeUtil.inIOSAPP()) {
                Bridge.ios(BRIDGE_EVENT.INIT_QUIZ_DATA).then(res => {
                    if (res && res.data) {
                        console.log(res.data);
                        this.dataList = res.data;
                        this.init();
                    }
                });
            } else if (interSiteCodeUtil.inAndroidAPP()) {
                Bridge.android(BRIDGE_EVENT.INIT_QUIZ_DATA).then(res => {
                    if (res && res.data) {
                        console.log(res.data);
                        this.dataList = res.data;
                        this.init();
                    }
                });
            } else {
                console.log(window.parent);
                let quizData = window.parent.cineQuizData;
                if (quizData) {
                    this.dataList = JSON.parse(quizData);
                    this.init();
                }
            }
        }
    }

    init() {
        if (this.dataList && this.dataList.length > 0) {
            this.loadCardByIndex(0);
        }
    }

    loadCardByIndex(index) {
        if (this.dataList && this.dataList.length > index) {
            let data = this.dataList[index];

            let btnHint = '下一题';
            if (this.dataList.length - 1 == index) {
                btnHint = this.quizBar ? '继续学习' : '查看得分';
            }

            this.setState({
                isEnd: false,
                data: data,
                index: index,
                selectOption: -1,
                inputDisabled: false,
                btnHint: btnHint,
            });

            window.scroll(0, 0);
        } else {
            if (this.quizBar) {
                this.exitQuiz();
            } else {
                this.toEnd();
            }
        }
    }

    onChangRadio(event) {
        let input = event.target;
        if (input.checked) {
            let selectLog = this.state.selectLog;
            selectLog[this.state.index] = input.value;
            this.setState({
                selectLog: selectLog,
                selectOption: input.id,
                inputDisabled: true,
            });
        }
    }

    // 下一题
    onNextCard() {
        this.loadCardByIndex(this.state.index + 1);
    }

    // 重新加载
    onAgainLoad() {
        this.loadCardByIndex(0);
        this.props.history.push('/card');
    }

    // 退出答题
    exitQuiz() {
        if (interSiteCodeUtil.inIOSAPP()) {
            Bridge.ios(BRIDGE_EVENT.QUIZ_EXIT);
        } else if (interSiteCodeUtil.inAndroidAPP()) {
            Bridge.android(BRIDGE_EVENT.QUIZ_EXIT);
        } else {
            console.log(window.parent);
            if (window.parent.cineExitQuiz) window.parent.cineExitQuiz();
        }
    }

    // 结束页
    toEnd() {
        let correctCount = 0;
        let allCount = this.dataList.length;
        this.state.selectLog.forEach(item => {
            if (item == 'true') correctCount++;
        });
        console.log(correctCount);

        let score;
        if (isNaN(correctCount) || isNaN(allCount)) {
            score = 0;
        } else {
            score =
                allCount <= 0
                    ? '0'
                    : Math.round(correctCount / allCount * 10000) / 100;
        }

        this.setState({
            isEnd: true,
            score: score,
        });
    }

    render() {
        if (this.state.isEnd) {
            return (
                <End
                    score={this.state.score}
                    exit={this.exitQuiz}
                    again={this.onAgainLoad}
                />
            );
        }

        if (!this.state.data) return <div />;

        let correctIndex = 0;
        let selectOption = this.state.selectOption;

        let OptionUI = this.state.data.answers.map((option, index) => {
            if (option.isCorrect) correctIndex = index;

            let isCurIndex = selectOption == index;
            let content =
                option.type == '2' ? (
                    <img
                        className="content"
                        src={'//www.bstcine.com' + option.content}
                    />
                ) : (
                    option.content
                );

            let optionHintStyle = isCurIndex
                ? { visibility: 'visible' }
                : { visibility: 'hidden' };

            return (
                <label key={index} className="card-option">
                    <img
                        className="hint"
                        style={optionHintStyle}
                        src={require(option.isCorrect
                            ? './../asset/image/ico_right.png'
                            : './../asset/image/ico_wrong.png')}
                    />
                    <input
                        id={index}
                        disabled={this.state.inputDisabled}
                        value={option.isCorrect}
                        type="radio"
                        onChange={this.onChangRadio}
                        checked={isCurIndex}
                    />
                    <span className="option">
                        {this.optionName[index] + '. '}
                    </span>
                    <span className="content">{content}</span>
                </label>
            );
        });

        let isCorrect = selectOption == correctIndex;
        return (
            <div className="quiz-card">
                <div className="card-title">
                    <span style={{ float: 'left' }}>
                        {this.state.index + 1 + '.'}&nbsp;
                    </span>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: this.state.data.title,
                        }}
                    />
                </div>
                {OptionUI}
                <div className="card-line" />
                <div className="card-todo">
                    <div className="card-answer">
                        <span
                            className={
                                selectOption == -1
                                    ? ''
                                    : isCorrect ? 'green' : 'red'
                            }
                        >
                            {isCorrect
                                ? '回答正确! '
                                : '正确答案：' + this.optionName[correctIndex]}
                        </span>
                    </div>
                    <button
                        className="card-next"
                        onClick={this.onNextCard}
                        disabled={this.state.selectOption == -1 ? true : false}
                    >
                        {this.state.btnHint}
                    </button>
                </div>
            </div>
        );
    }
}

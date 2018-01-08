import React, {Component} from 'react';
import storeUtil from '@/util/storeUtil';
import Bridge from "@/util/bridge";
import SITECODE from "@/constant/sitecode";
import End from './end.js';

export default class Card extends Component {

    constructor(props) {
        super(props);
        console.log('constructor');

        this.state = {
            selectLog: [],
            index: 0,
            selectOption: -1,
            isEnd: false,
            btnHint:'下一题'
        };

        this.dataList = [];
        this.optionName = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
        this.quizIsOver = storeUtil.get('quiz_isOver');

        this.onChangRadio = this.onChangRadio.bind(this);
        this.onNextCard = this.onNextCard.bind(this);
        this.onAgainLoad = this.onAgainLoad.bind(this);
    }

    componentDidMount() {
        let quizList = storeUtil.get('quiz_list');
        if (quizList && quizList.length > 0) {
            this.dataList = quizList;
            this.loadCardByIndex(0);
        }
    }

    onChangRadio(event) {
        let input = event.target;
        if (input.checked) {
            let selectLog = this.state.selectLog;
            selectLog[this.state.index] = input.value;
            this.setState({
                selectLog: selectLog,
                selectOption: input.id
            });
        }

        this.inputRadioDisabled(true);
    }

    //下一题
    onNextCard() {
        this.loadCardByIndex(this.state.index + 1);
    }

    //重新加载
    onAgainLoad(){
        this.loadCardByIndex(0);
        this.props.history.push('/card');
    }

    //退出答题
    exitQuiz() {
        let sitecode = storeUtil.get('sitecode');
        if (sitecode === SITECODE.ANDROID_PHONE || sitecode === SITECODE.ANDROID_PAD || sitecode === SITECODE.ANDROID) {
            Bridge.android(Bridge.QUIZ_EXIT);
        } else if (sitecode === SITECODE.IOS || sitecode === SITECODE.IOS_IPHONE || sitecode === SITECODE.IOS_IPAD) {
            Bridge.ios(Bridge.QUIZ_EXIT);
        } else {
            console.log(window.parent);
            if(window.parent.cineExitQuiz) window.parent.cineExitQuiz();
        }
    }

    loadCardByIndex(index) {
        if (this.dataList && this.dataList.length > index) {
            let data = this.dataList[index];
            let btnHint = '下一题';
            if(this.dataList.length -1 == index){
                btnHint = this.quizIsOver?'查看得分':'继续学习'
            }

            this.inputRadioDisabled(false);

            this.setState({
                isEnd: false,
                data: data,
                index: index,
                selectOption: -1,
                btnHint:btnHint
            });

            window.scroll(0,0);
        } else {
            if (this.quizIsOver) {
                this.toEnd();
            } else {
                this.exitQuiz();
            }
        }
    }

    //设置按钮状态
    inputRadioDisabled(disabled) {
        let quiz_options = document.getElementsByName('options');
        quiz_options.forEach((option) => {
            option.disabled = disabled;
        });
    }

    //结束页
    toEnd() {
        let correctCount = 0;
        let allCount = this.dataList.length;
        this.state.selectLog.forEach((item) => {
            if (item == 'true') correctCount++;
        });
        console.log(correctCount);

        let score;
        if (isNaN(correctCount) || isNaN(allCount)) {
            score = 0;
        } else {
            score = allCount <= 0 ? "0" : (Math.round(correctCount / allCount * 10000) / 100);
        }

        this.setState({
            isEnd: true,
            score: score
        });
    }

    render() {
        if (this.state.isEnd) return <End score={this.state.score} exit={this.exitQuiz} again={this.onAgainLoad}/>;

        if (!this.state.data) return <div>not data</div>;

        let correctIndex = 0;
        let selectOption = this.state.selectOption;

        let OptionUI = this.state.data.answers.map((option, index) => {
            if (option.isCorrect) correctIndex = index;

            let isCurIndex = selectOption == index;
            let content = option.type == '2' ?
                <img className="content" src={"http://www.bstcine.com" + option.content}/> : option.content;

            let optionHintStyle = isCurIndex ? {visibility: 'visible'} : {visibility: 'hidden'};

            return <label key={index} className="mui-radio card-option">
                <span style={optionHintStyle}>
                    <img className="hint"
                         src={require(option.isCorrect ? './../asset/image/ico_right.png' : './../asset/image/ico_wrong.png')}/>
                </span>
                <input id={index} name="options" value={option.isCorrect} type="radio" onChange={this.onChangRadio}
                       checked={isCurIndex}/>
                <span className="content">{this.optionName[index] + ". "}{content}</span>
            </label>
        });

        let isCorrect = selectOption == correctIndex;
        let answerHintStyle = selectOption == -1 ? "" : (isCorrect ? "green" : "red");

        return <div className="quiz-main">
            <div className="card-title">
                <span style={{float: "left"}}>{(this.state.index + 1) + ". "}</span>
                <div dangerouslySetInnerHTML={{__html: this.state.data.title}}/>
            </div>
            {OptionUI}
            <hr/>
            <div className="card-todo">
                <div className="card-answer">
                    <span
                        className={answerHintStyle}>{isCorrect ? '回答正确! ' : '正确答案：' + this.optionName[correctIndex]}</span>
                </div>
                <button className="card-next" onClick={this.onNextCard} disabled={(this.state.selectOption == -1) ? true : false}>{this.state.btnHint}</button>
            </div>
        </div>
    }

}








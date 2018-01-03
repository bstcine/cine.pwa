import React, {Component} from 'react';
import * as storeUtil from '@/util/storeUtil';
import End from './end.js';

export default class Card extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectLog: [],
            index: 0,
            selectOption: -1,
            isEnd: false
        };

        this.dataList = [];
        this.optionName = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

        this.onChangRadio = this.onChangRadio.bind(this);
        this.nextCard = this.nextCard.bind(this);
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

    loadCardByIndex(index) {
        if (this.dataList && this.dataList.length > index) {
            let data = this.dataList[index];

            this.inputRadioDisabled(false);

            this.setState({
                data: data,
                index: index,
                selectOption: -1
            })
        } else {
            this.toEnd();
        }
    }

    //设置按钮状态
    inputRadioDisabled(disabled) {
        let quiz_options = document.getElementsByName('options');
        quiz_options.forEach((option) => {
            option.disabled = disabled;
        });
    }

    //下一题
    nextCard() {
        this.loadCardByIndex(this.state.index + 1);
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
        if (this.state.isEnd) return <End score={this.state.score}/>;

        if (!this.state.data) return <div>not data</div>;

        let correctIndex = 0;
        let selectOption = this.state.selectOption;

        let OptionUI = this.state.data.answers.map((option, index) => {
            if (option.isCorrect) correctIndex = index;

            let isCurIndex = selectOption == index;
            let content = option.type == '2' ? <img className="content" src={"http://www.bstcine.com" + option.content}/> : option.content;

            let optionHintStyle = isCurIndex ? {visibility: 'visible'} : {visibility: 'hidden'};

            return <label key={index} className="mui-radio card-option">
                <span style={optionHintStyle}>
                    <img className="hint" src={require(option.isCorrect ? './../asset/image/ico_right.png' : './../asset/image/ico_wrong.png')}/>
                </span>
                <input id={index} name="options" value={option.isCorrect} type="radio" onChange={this.onChangRadio} checked={isCurIndex}/>
                <span className="content">{this.optionName[index] + ". "}{content}</span>
            </label>
        });

        let isCorrect = selectOption == correctIndex;
        let answerHintStyle = "card-answer" + (selectOption == -1 ? "" : (isCorrect ? "-correct" : "-err"));

        return <div className="quiz-main">
            <div className="card-title">
                <span style={{float: "left"}}>{(this.state.index + 1) + ". "}</span>
                <div dangerouslySetInnerHTML={{__html: this.state.data.title}}/>
            </div>
            {OptionUI}
            <hr/>
            <div className="card-todo">
                <div className={answerHintStyle}>{isCorrect ? '回答正确! ' : '正确答案：' + this.optionName[correctIndex]}</div>
                <button onClick={this.nextCard}>下一题</button>
            </div>
        </div>
    }

}








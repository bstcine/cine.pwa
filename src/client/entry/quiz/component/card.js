import React, {Component} from 'react';
import * as storeUtil from '@/util/storeUtil'
import Bridge from "@/util/bridge";
import SITECODE from "@/constant/sitecode";

export default class Card extends Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.dataList = [];
        this.optionName = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

        this.submitClick = this.submitClick.bind(this);
    }

    componentDidMount() {
        let quizList = storeUtil.get('quiz_list');
        console.log(quizList);
        if (quizList && quizList.length > 0) {
            this.dataList = quizList;

            this.setState({
                data: this.dataList[0],
                seq: 1
            });
        }
    }

    submitClick() {
        this.state.data.forEach((item) => {
            let itemId = item.id;
            let quiz_answer = document.getElementById(itemId);
            let quiz_input = document.getElementsByName(itemId);

            quiz_answer.hidden = false;
            quiz_input.forEach((input) => {
                let quiz_option = document.getElementById(itemId + input.id);

                if (input.checked) {
                    quiz_option.style.visibility = "visible";
                } else {
                    quiz_option.style.visibility = "hidden";
                }
            });
        });

        window.scroll(0, 0);
    }

    static closeClick() {
        let sitecode = storeUtil.get('sitecode');
        // alert(`sitecode ${sitecode}`)
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
        let item = this.state.data;
        let sureIndex = 0;

        return !item ? <div>not data</div> :
            <div>
                <div key={item.id} className="mui-panel">
                    <div>
                        <span className="card-title">{this.state.seq + ". "}</span>
                        <div dangerouslySetInnerHTML={{__html: item.title}}/>
                    </div>
                    {item.answers.map((option, index) => {
                        let content;
                        if (option.type == '2') {
                            let imgUrl = "http://www.bstcine.com" + option.content;
                            content = <img src={imgUrl} height={100}/>
                        } else {
                            content = <span className="mui--text-body1">{option.content}</span>
                        }

                        if (option.isCorrect) sureIndex = index;

                        return <label key={index} className="mui-radio card-option">
                                    <span id={item.id + index}
                                          style={{visibility: 'hidden'}}>{option.isCorrect ? "正确 " : "错误 "}</span>
                            <input id={index} name={item.id} value={option.isCorrect} type="radio"/>
                            {this.optionName[index] + ". "}
                            {content}
                        </label>
                    })}
                    <span id={item.id} hidden><hr/>正确答案：{this.optionName[sureIndex]}</span>
                </div>
                <div>
                    <button className="mui-btn mui-btn--primary" onClick={(e) => this.submitClick(e)}>提交</button>
                    <button className="mui-btn mui-btn--danger" onClick={(e) => Index.closeClick(e)}>退出</button>
                </div>
            </div>
    }

}








import React, {Component} from 'react';
import * as Service from '@/service/quiz'
import {getParam} from '@/util/urlUtil'
import Bridge from "@/util/bridge";
import SITECODE from "@/constant/sitecode";
import * as storeUtil from '@/util/storeUtil'

export default class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            quiz: [],
        };

        this.optionName = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

        this.submitClick = this.submitClick.bind(this);
    }

    componentDidMount() {
        let param = getParam();
        console.log(param.id);
        Service.getQuiz({id: param.id}).then(result => {
            console.log(result.data);
            this.init(result.data.data)
        })
    }

    init(data) {
        this.setState({
            loading: false,
            quiz: data
        })
    }

    submitClick() {
        this.state.quiz.forEach((item) => {
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
        if (sitecode === SITECODE.CINE_ANDROID_PHONE || sitecode === SITECODE.CINE_ANDROID_PAD || sitecode === SITECODE.CINE_ANDROID) {
            Bridge.android('exit_quiz');
        } else if (sitecode === SITECODE.CINE_IOS || sitecode === SITECODE.CINE_IOS_IPHONE || sitecode === SITECODE.CINE_IOS_IPAD) {
            Bridge.ios('exit_quiz');
        } else {
            console.log('exit_quiz');
            window.parent.exit_quiz();
        }
    }


    render() {
        return (
            this.state.loading ?
                <div>loading</div> :
                <div>
                    <div>
                        <h2>小节测试</h2>
                        <hr/>
                    </div>
                    {this.state.quiz.map((item, index) => {
                        let itemId = item.id;
                        let sureKey = 0;

                        return <div key={itemId} className="mui-panel">
                            <div>
                                <span className="card-title">{(index + 1) + ". "}</span>
                                <div dangerouslySetInnerHTML={{__html: item.title}}/>
                            </div>
                            {item.answers.map((option, key) => {
                                let content;
                                if (option.type == '2') {
                                    let imgUrl = "http://www.bstcine.com" + option.content;
                                    content = <img src={imgUrl} height={100}/>
                                } else {
                                    content = <span className="mui--text-body1">{option.content}</span>
                                }

                                if (option.isCorrect) sureKey = key;

                                return <label key={key} className="mui-radio card-option">
                                    <span id={itemId + key}
                                          style={{visibility: 'hidden'}}>{option.isCorrect ? "正确 " : "错误 "}</span>
                                    <input id={key} name={itemId} value={option.isCorrect} type="radio"/>
                                    {this.optionName[key]+". "}
                                    {content}
                                </label>
                            })}
                            <span id={itemId} hidden><hr/>正确答案：{this.optionName[sureKey]}</span>
                        </div>
                    })}
                    <div>
                        <button className="mui-btn mui-btn--primary" onClick={(e) => this.submitClick(e)}>提交</button>
                        <button className="mui-btn mui-btn--danger" onClick={(e) => Index.closeClick(e)}>退出</button>
                    </div>
                </div>
        )
    }

}








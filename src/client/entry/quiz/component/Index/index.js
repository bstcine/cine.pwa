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

        this.renderCards = this.renderCards.bind(this);
    }

    componentDidMount() {
        let param = getParam();
        console.log(param.id);
        Service.getQuiz({id: param.id}).then(result => {
            console.log(result.data);
            this.setState({
                loading: false,
                quiz: result.data.data
            })
        })
    }

    static submitClick() {
        let answerSure = document.getElementsByName('answerSure');
        for (let i = 0; i < answerSure.length; i++)  {
            answerSure[i].style.background = "#32CD32";
        }
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

    renderCards() {
        let quiz = this.state.quiz.map((item, index) => {
            let itemId = item.id;
            let options = item.answers.map((option, key) => {
                let content;
                if (option.type == '2') {
                    let imgUrl = "http://www.bstcine.com" + option.content;
                    content = <img src={imgUrl} height={100}/>
                } else {
                    content = <span className="mui--text-body1">{option.content}</span>
                }

                let answerHint;
                if(option.isCorrect){
                    answerHint = "answerSure";
                }else {
                    answerHint = "answerError";
                }

                return <div key={key} className="mui-radio" name={answerHint}>
                    <label>
                        <input type="radio" name={itemId} id={itemId + key} value={option.isCorrect}/>
                        {content}
                    </label>
                </div>
            });

            return <div key={itemId} className="mui-panel">
                <span className="mui--text-title">{(index + 1) + "." + item.title}</span>
                {options}
            </div>
        });
        return quiz;
    }


    render() {
        return (
            this.state.loading ?
                <div>loading</div> :
                <div>
                    {this.renderCards()}
                    <div>
                        <button className="mui-btn mui-btn--primary" onClick={(e) => Index.submitClick(e)}>答案</button>
                        <button className="mui-btn mui-btn--danger" onClick={(e) => Index.closeClick(e)}>关闭</button>
                    </div>
                </div>
        )
    }

}








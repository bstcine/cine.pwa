import React from 'react';
import * as storeUtil from 'common/util/storeUtil'
import * as Service from '../service/index'
import {CSSTransition} from 'react-transition-group'
import {initWechat, setShareParam} from 'common/util/wechatUtil'

export default class Card extends React.Component {

    constructor(props) {
        super(props)
        console.log('Card constructor')
        this.state = {
            loading: false,
            wordItem: {id: "", word: "", options: []},
            currMinVocab: 0,
            currMaxVocab: 0,
            isShowLevelTip: false,
            progressing: false,
            pressing: false,
        }
        this.disableClick = false
        this.sandGlassTimer = null
        this.levelTipTimer = null
        this.duration = 15000
        console.log(`Card this.props.token ${this.props.token}`)
        this.optionClick = this.optionClick.bind(this)
        this.renderOptions = this.renderOptions.bind(this)
    }

    componentWillMount() {
        console.log('componentWillMount')
        let user = storeUtil.get('user')
        if (!user) {
            return this.props.history.replace('/userinfo')
        }
        let query = {
            grade: user.grade,
            born_at: user.born_at,
            area_code: user.area_code
        }
        Service.getWordList(query).then((result) => {
            this.setState({
                loading: false
            })
            this.init(result.wordLevelList)
            this.grade = result.grade
        })
    }

    componentDidMount() {
        console.log('componentDidMount')
        initWechat().then((err)=>{
            if(!err){
                setShareParam({
                    title: "title11111  Card",
                    link: "http://www.bstcine.com/lesson/42",
                    imgUrl: "http://www.bstcine.com/f/2017/08/21/160423502SrRRfn8.jpg",
                    desc: "descdesc"
                })
            }
        })
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
        if (this.sandGlassTimer) clearTimeout(this.sandGlassTimer)
        if (this.levelTipTimer) clearTimeout(this.levelTipTimer)
    }

    //初始化
    init(wordLevelList) {
        //答题开始时间
        this.begin_at = new Date().getTime()
        this.wordLevelList = wordLevelList
        this.level_index = 0
        this.word_index = 0
        let wordLevel = this.wordLevelList[this.level_index]
        this.setState({
            wordItem: Object.assign({}, wordLevel.wordList[0]),
            progressing: true
        }, () => {
            this.toggleSandGlass()
        })
    }

    //下一个单词
    nextWord() {
        console.log(`nextWord --> level_index: ${this.level_index} -- word_index: ${this.word_index}`)
        let wordLevel = this.wordLevelList[this.level_index]
        if (this.word_index === wordLevel.wordList.length - 1) {
            return this.nextLevel()
        }
        this.disableClick = false
        this.word_index++;
        this.setState({
            wordItem: Object.assign({}, wordLevel.wordList[this.word_index]),
            progressing: true,
            pressing: !this.state.pressing
        }, () => {
            this.toggleSandGlass()
        })
    }

    //沙漏倒计时
    toggleSandGlass() {
        if (this.sandGlassTimer) clearTimeout(this.sandGlassTimer)
        this.sandGlassTimer = setTimeout(() => {
            this.saveOneAnswer(99)
            this.setState({
                progressing: false,
                pressing: !this.state.pressing,
            }, () => {
                setTimeout(() => {
                    this.nextWord()
                }, 300)
            })
        }, this.duration)//15秒自动跳转下一题
    }

    //下个词汇等级
    nextLevel() {
        console.log(`nextLevel --> level_index: ${this.level_index}`)
        //当 curr_level_score < 3 时，测试不进入下一等级，测试终止
        if (this.calcCurrLevelScore() < 3) return this.theEnd()
        if (this.level_index === this.wordLevelList.length - 1) return this.theEnd()
        this.disableClick = false
        this.showLevelTip()
        //下一级
        this.level_index++;
        this.word_index = 0;
        let wordLevel = this.wordLevelList[this.level_index]
        this.setState({
            wordItem: Object.assign({}, wordLevel.wordList[0]),
            progressing: true,
        }, () => {
            this.toggleSandGlass()
        })
    }

    showLevelTip() {
        let wordLevel = this.wordLevelList[this.level_index]
        this.setState({
            currMinVocab: wordLevel.min_vocab,
            currMaxVocab: wordLevel.max_vocab,
            isShowLevelTip: true
        })
        console.log(`isShowLevelTip ${this.state.isShowLevelTip}`)
        this.levelTipTimer = setTimeout(function () {
            this.setState({
                isShowLevelTip: false
            })
        }.bind(this), 3000)
    }

    // 答题结束
    theEnd() {
        console.log('theEnd')
        this.disableClick = true
        //答题结束时间
        this.end_at = new Date().getTime()
        let user = storeUtil.get('user')
        let query = {
            grade: user.grade,
            born_at: user.born_at,
            area_code: user.area_code,
            vocab: this.calcCurrVocab(),
            answers: this.collectAnswers(),
            duration: this.getDuration()
        };
        if (this.props.token) query.token = this.props.token
        Service.saveContentWordResult(query).then((result) => {
            if (result.except_case_desc) {
                return alert(result.except_case_desc)
            }
            console.log(`result ${JSON.stringify(result)}`)
            this.props.history.push(`/report?id=${result.result.statsContentWord.id}`)
        })
    }

    //保存单个单词的答题信息
    saveOneAnswer(answer_index) {
        console.log(`answer_index ${answer_index}`)
        let word = this.wordLevelList[this.level_index].wordList[this.word_index]
        word.answer_index = answer_index
    }

    //收集全部答题信息
    collectAnswers() {
        let answers = []
        this.wordLevelList.forEach(function (wordLevel) {
            wordLevel.wordList.forEach(function (item) {
                if (item.answer_index) {
                    answers.push({
                        id: item.id,
                        index: item.answer_index
                    })
                }
            })
        })
        return answers;
    }

    //耗时(秒)
    getDuration() {
        let duration = parseInt((this.end_at - this.begin_at) / 1000);
        console.log(`getDuration ${duration}`)
        return duration
    }

    //计算当前词汇等级得分
    calcCurrLevelScore() {
        let wordLevel = this.wordLevelList[this.level_index]
        let right_count = 0
        let wrong_count = 0
        wordLevel.wordList.forEach(function (item) {
            if (item.answer_index === 0) {
                right_count++
            } else {
                wrong_count++
            }
        })
        let curr_score = right_count - wrong_count / 3
        curr_score = curr_score >= 0 ? curr_score : 0
        wordLevel.curr_score = curr_score
        console.log(`calcCurrLevelScore ${curr_score}`)
        return curr_score
    }

    //计算当前词汇量
    calcCurrVocab() {
        let curr_vocab = 0
        this.wordLevelList.forEach(function (wordLevel) {
            if (wordLevel.curr_score) {
                curr_vocab += parseInt(wordLevel.curr_score * (wordLevel.max_vocab - wordLevel.min_vocab) / wordLevel.wordList.length)
            }
        })
        console.log(`calcCurrVocab ${curr_vocab}`)
        return curr_vocab
    }

    optionClick(answer_index) {
        if (this.disableClick) return
        this.disableClick = true
        this.saveOneAnswer(answer_index)
        // 按钮&进度条动画延迟
        this.setState({
            progressing: false,
            pressing: true,
        }, () => {
            setTimeout(() => {
                this.nextWord()
            }, 300)
        })
    }

    renderOptions() {
        let options = this.state.wordItem.options
        let Options = options.map((option, i) => {
            return <button key={this.state.wordItem.id + i} className="btn btn_option"
                           onClick={(e) => this.optionClick(option.value, e)}>{option.zh}</button>
        })
        Options.push(<button key={this.state.wordItem.id + 99} className="btn btn_option btn_no_remember"
                             onClick={(e) => this.optionClick(99, e)}>不认识</button>)
        return Options
    }

    render() {
        return (
            this.state.loading ?
                <div>loading</div> :
                <div className="card">
                    <CSSTransition in={this.state.isShowLevelTip} classNames="fade" appear={true} enter={true}
                                   exit={true} timeout={{enter: 2700, exit: 300}}>
                        <div className="friendly-tips">
                            你已经完成了{this.state.currMinVocab}-{this.state.currMaxVocab}词汇量区间的测试
                        </div>
                    </CSSTransition>
                    <div className="word" key={this.state.wordItem.id + "word"}>{this.state.wordItem.word}</div>
                    <div className="progress_control" key={this.state.wordItem.id + "progress_control"}>
                        <div className="sand-glass"></div>
                        <div className="progress-line">
                            <CSSTransition in={this.state.progressing} classNames="progressing" appear={true}
                                           enter={true} exit={false} timeout={this.duration}>
                                <div className="progress-line-left"></div>
                            </CSSTransition>
                        </div>
                    </div>
                    <div className="options" key={this.state.wordItem.id + "options"}>
                        {this.renderOptions()}
                    </div>
                </div>
        )
    }
}
import React from 'react';
import * as Service from '../../service/word'
import * as util from '../../util'
import 'component/word/style/card.less'

export default class Card extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            wordItem: {id: "", word: "", options: []},
            completed: 0
        }
        this.sandGlassTimer = null
        console.log(`Card this.props.token ${this.props.token}`)
        this.optionClick = this.optionClick.bind(this)
        this.renderOptions = this.renderOptions.bind(this)
    }

    componentWillMount() {
        console.log('componentWillMount')
        let query = {
            grade: util.getUrlParam('grade'),
            born_at: util.getUrlParam('born_at'),
            area: util.getUrlParam('area'),
        };
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
            wordItem: Object.assign({}, wordLevel.wordList[0])
        })
        this.toggleSandGlass()
    }

    //下一个单词
    nextWord() {
        console.log(`nextWord --> level_index: ${this.level_index} -- word_index: ${this.word_index}`)
        let wordLevel = this.wordLevelList[this.level_index]
        if (this.word_index === wordLevel.wordList.length - 1) {
            return this.nextLevel()
        }
        this.word_index++;
        this.setState({
            wordItem: Object.assign({}, wordLevel.wordList[this.word_index]),
        })
        this.toggleSandGlass()
    }

    //沙漏倒计时
    toggleSandGlass() {
        let progressLineLeft = this.refs.progressLineLeft
        progressLineLeft.classList.remove('active')
        setTimeout(function () {
            progressLineLeft.classList.add('active')
        },10)

        if(this.sandGlassTimer) clearTimeout(this.sandGlassTimer)
        this.sandGlassTimer = setTimeout(function () {
            this.saveOneAnswer(99)
            this.nextWord()
        }.bind(this),10000)//10秒自动跳转下一题
    }

    //下个词汇等级
    nextLevel() {
        console.log(`nextLevel --> level_index: ${this.level_index} -- word_index: ${this.word_index}`)
        //当 curr_level_score < 3 时，测试不进入下一等级，测试终止
        if (this.calcCurrLevelScore() < 3) return this.theEnd()
        if (this.level_index === this.wordLevelList.length - 1) return this.theEnd()
        let curr_vocab = this.calcCurrVocab();
        if (this.calcCurrVocab()) {
            // todo 超出当前年级的平均/优秀水平，友好提示

        }
        this.level_index++;
        this.word_index = 0;
        let wordLevel = this.wordLevelList[this.level_index]
        this.setState({
            wordItem: Object.assign({}, wordLevel.wordList[0])
        })
    }

    // 答题结束
    theEnd() {
        console.log('theEnd')
        //答题结束时间
        this.end_at = new Date().getTime()
        let query = {
            grade: util.getUrlParam('grade'),
            born_at: util.getUrlParam('born_at'),
            area: util.getUrlParam('area'),
            vocab:this.calcCurrVocab(),
            answers:this.collectAnswers(),
            duration:this.getDuration()
        };
        if (this.props.token) query.token = this.props.token
        Service.saveContentWordResult(query).then((result) => {
            this.props.history.push(`/report?id=${result.statsContentWord.id}`)
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
                if(item.answer_index) {
                    answers.push({
                        id:item.id,
                        index:item.answer_index
                    })
                }
            })
        })
        return answers;
    }

    //耗时(秒)
    getDuration() {
        let duration =parseInt((this.end_at - this.begin_at) / 1000);
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
        wordLevel.curr_score = curr_score >= 0 ? curr_score : 0
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
        this.saveOneAnswer(answer_index)
        setTimeout(function () {
            this.nextWord()
        }.bind(this), 180)
    }

    renderOptions(){
        let options = this.state.wordItem.options
        let Options = options.map((option) => {
            return <button className="button button_option" onClick={(e) => this.optionClick(option.value, e)}>{option.zh}</button>
        })
        Options.push(<button className="button button_option button_no_remember" onClick={(e) => this.optionClick(99, e)}>不认识</button>)
        return Options
    }

    render() {
        return (
            this.state.loading ?
                <div>loading</div> :
                <div className="card" >
                    <div className="word">{this.state.wordItem.word}</div>
                    <div className="progress_control">
                        <div className="sand_glass"></div>
                        <div className="progress_line">
                            <div className="progress_line_left" ref="progressLineLeft"></div>
                        </div>
                    </div>
                    <div className="options" key={this.state.wordItem.id}>
                        {this.renderOptions()}
                    </div>
                </div>
        )
    }
}
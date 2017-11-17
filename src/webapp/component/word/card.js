import React from 'react';
import * as Service from '../../service/word'
import * as util from '../../util'

export default class Card extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            wordItem: {id: "", word: "", options: []},
            completed: 0
        }
        this.optionClick = this.optionClick.bind(this)
    }

    componentWillMount() {
        console.log('componentWillMount')
    }

    componentDidMount() {
        console.log('componentDidMount')
        let query = {
            grade: util.getUrlParam('grade'),
            born_at: util.getUrlParam('born_at'),
            area: util.getUrlParam('area'),
        };
        if (this.props.token) query.token = this.props.token
        Service.getWordList(query).then((result) => {
            this.setState({
                loading: false
            })
            this.init(result.wordLevelList)
            this.grade = result.grade
        })
    }

    //初始化
    init(wordLevelList) {
        this.wordLevelList = wordLevelList
        this.level_index = 0
        this.word_index = 0
        let wordLevel = this.wordLevelList[this.level_index]
        this.setState({
            wordItem: Object.assign({}, wordLevel.wordList[0])
        })
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
            wordItem: Object.assign({}, wordLevel.wordList[this.word_index])
        })
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
        let query = {
            grade: util.getUrlParam('grade'),
            born_at: util.getUrlParam('born_at'),
            area: util.getUrlParam('area'),
            vocab:this.calcCurrVocab()
        };
        if (this.props.token) query.token = this.props.token
        Service.saveContentWordResult(query).then((result) => {

        })
    }

    //保存单个单词的答题信息
    saveOneAnswer(answer_index) {
        let word = this.wordLevelList[this.level_index].wordList[this.word_index]
        word.answer_index = answer_index
    }

    //收集全部答题信息
    CollectAnswer() {

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
        wordLevel.curr_score = curr_score
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
        return curr_vocab
    }


    componentWillReceiveProps() {
        console.log('componentWillReceiveProps')
    }

    shouldComponentUpdate() {
        // console.log('shouldComponentUpdate')
        return true;
    }

    componentWillUpdate() {
        // console.log('componentWillUpdate')
    }

    componentDidUpdate() {
        // console.log('componentDidUpdate')
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')

    }

    optionClick(answer_index) {
        console.log(`answer_index ${answer_index}`)
        this.saveOneAnswer(answer_index)
        this.nextWord()
        //
        //
        // console.log(`cur_index ${this.cur_index}`)
        // this.setState({
        //     completed: parseInt(((this.cur_index + 1) / this.wordList.length) * 100)
        // })
        // if (this.cur_index === this.wordList.length - 1) {
        //     return location.href = '#/end'
        // }
        // let wordItem = this.wordList[this.cur_index]
        // setTimeout(function () {
        //     this.cur_index++
        //     this.setState({
        //         wordItem: wordItem,
        //     })
        // }.bind(this), 300)

    }

    render() {
        let word = this.state.wordItem.word
        let options = this.state.wordItem.options
        let Options = options.map((option, i) => {
            return <div key={i}>
                <button raised color="primary"
                        onClick={(e) => this.optionClick(option.value, e)}>{option.zh}</button>
            </div>
        })
        return (
            <div>
                {
                    this.state.loading ? <div>loading</div> :
                        <div>
                            <p>{word}</p>
                            {Options}
                            <div>
                                <button raised color="primary" onClick={(e) => this.optionClick(99, e)}>不认识</button>
                            </div>
                        </div>
                }
            </div>
        )
    }
}
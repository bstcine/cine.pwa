import React from 'react';
import Link from 'react-router-dom'
import Button from 'material-ui/Button'
import {CircularProgress} from 'material-ui/Progress'
import * as Service from '../../service/word'

export default class Card extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            wordItem:{word:"",options:[]}
        }
        this.optionClick = this.optionClick.bind(this)
        this.wordList = []
        this.cur_index = 0
    }

    componentWillMount() {
        console.log('componentWillMount')
    }

    componentDidMount() {
        console.log('componentDidMount')
        Service.getWordList().then((result) => {
            this.wordList = result
            let wordItem = this.wordList[this.cur_index]
            this.setState({
                loading: false,
                wordItem: wordItem
            })
        })
    }

    componentWillReceiveProps() {
        console.log('componentWillReceiveProps')
    }

    shouldComponentUpdate() {
        console.log('shouldComponentUpdate')
        return true;
    }

    componentWillUpdate() {
        console.log('componentWillUpdate')
    }

    componentDidUpdate() {
        console.log('componentDidUpdate')
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')

    }

    optionClick(value) {
        console.log(value)
        console.log(`cur_index ${this.cur_index}`)
        if(this.cur_index === this.wordList.length - 1) {
            return alert('the end')
        }
        this.cur_index++
        let wordItem = this.wordList[this.cur_index]
        this.setState({
            wordItem: wordItem
        })
    }

    render() {
        let word = this.state.wordItem.word
        let options = this.state.wordItem.options
        let Options = options.map( (option, i) =>{
            return <div key={i}><Button raised color="primary"
                                 onClick={(e)=>this.optionClick(option.value,e)}>{option.zh}</Button></div>
        })
        return (
            <div>
                {this.state.loading ?
                    <CircularProgress/> :
                    <div>
                        <p>{word}</p>
                        {Options}
                        <div><Button raised color="primary" onClick={(e)=>this.optionClick(0,e)}>都不是</Button></div>
                    </div>
                }
            </div>
        )
    }
}
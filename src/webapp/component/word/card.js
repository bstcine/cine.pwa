import React from 'react';
import Link from 'react-router-dom'
import Button from 'material-ui/Button'
import {CircularProgress} from 'material-ui/Progress'
import * as Service from '../../service/word'

let wordList = []
let cur_index = 0

export default class Card extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            word: "",
            options: []
        }

        this.optionClick = this.optionClick.bind(this)
    }

    componentWillMount() {
        console.log('componentWillMount')
    }

    componentDidMount() {
        console.log('componentDidMount')
        Service.getWordList().then((result) => {
            wordList = result
            console.log(JSON.stringify(wordList))
            let wordItem = wordList[cur_index]
            this.setState({
                loading: false,
                word: wordItem.word,
                options: wordItem.options
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
        if(cur_index === wordList.length){
            return alert('end')
        }
        cur_index++
        let wordItem = wordList[cur_index]
        this.setState({
            word: wordItem.word,
            options: wordItem.options
        })
    }

    render() {
        let word = this.state.word
        let options = this.state.options
        console.log(options)
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
                        <div><Button raised color="primary" href="#/card/1">都不是</Button></div>
                    </div>
                }
            </div>
        )
    }
}
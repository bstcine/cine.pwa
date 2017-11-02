import React from 'react';
import Link from 'react-router-dom'
import Button from 'material-ui/Button'
import {CircularProgress} from 'material-ui/Progress'
import {post} from '../../service/request'
import Api from '../../config/api'


export default class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            wordList: []
        }
    }

    componentWillMount() {
        console.log('componentWillMount')
    }

    componentDidMount() {
        console.log('componentDidMount')
        post(Api.APIURL_Content_Word_List, null)
            .then(result => {
                console.log(result)
                this.setState({
                    loading: false
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentWillReceiveProps() {
        console.log('componentWillReceiveProps')
    }

    shouldComponentUpdate() {
        console.log('shouldComponentUpdate')
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


    render() {
        return (
            <div>
                {this.state.loading ?
                    <CircularProgress/> :
                    <div>
                        <p>happy</p>
                        <Button raised color="primary" href="#/card/1">开心的1</Button><br/>
                        <Button raised color="primary" href="#/card/1">开心的2</Button><br/>
                        <Button raised color="primary" href="#/card/1">开心的3</Button><br/>
                        <Button raised color="primary" href="#/card/1">开心的4</Button><br/>
                        <Button raised color="primary" href="#/card/1">开心的5</Button>
                    </div>
                }
            </div>
        )
    }
}
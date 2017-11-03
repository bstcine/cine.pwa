import _ from 'lodash'
import {post} from './request'
import Api from '../config/api'

export let getWordList = () => {
    return post(Api.APIURL_Content_Word_List, null)
        .then(result => {
            console.log('getWordList')
            console.log(result)
            let wordList = result.result.map(function (item) {
                let options = [
                    {zh: item.zh, isCorrect: true, value: 0},
                    {zh: item.zh_similar1, isCorrect: false, value: 1},
                    {zh: item.zh_similar2, isCorrect: false, value: 2},
                    {zh: item.zh_similar3, isCorrect: false, value: 3},
                ];
                options = _.shuffle(options)
                return {
                    word:item.word,
                    options:options
                }
            });
            console.log(wordList)
            return wordList
        })
        .catch(error => {
            console.log(error)
        })
}
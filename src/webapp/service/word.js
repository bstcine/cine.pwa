import _ from 'lodash'
import {post} from './request'
import Api from '../config/api'

export let getContentWordConfig = (query) => {
    return post(Api.APIURL_Content_Word_Config, query)
}

export let getWordList = (query) => {
    return post(Api.APIURL_Content_Word_List, query)
        .then(result => {
            console.log('getWordList')
            console.log(result.result)
            let wordLevelList = result.result.wordLevelList;
            let grade = result.result.grade;
            wordLevelList.forEach(function (wordLevel) {
                wordLevel.wordList = wordLevel.wordList.map(function (item) {
                    let options = [
                        {zh: item.zh, isCorrect: true, value: 0},
                        {zh: item.zh_similar1, isCorrect: false, value: 1},
                        {zh: item.zh_similar2, isCorrect: false, value: 2},
                        {zh: item.zh_similar3, isCorrect: false, value: 3},
                    ];
                    options = _.shuffle(options)
                    return {
                        word: item.word,
                        options: options
                    }
                })
            });
            return {
                wordLevelList: wordLevelList,
                grade: grade
            }
        })
        .catch(error => {
            console.log(error)
        })
}

export let saveContentWordResult = (query) => {
    return post(Api.APIURL_Content_Word_Config, query)
}
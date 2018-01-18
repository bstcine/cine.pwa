import _ from 'lodash';
import {post} from '@/service/request';
import Api from '@/../APIConfig';

export let getContentWordConfig = query => {
    return post(Api.APIURL_Content_Word_Config, query).then(result => {
        if (result.code !== '1') {
            return alert(result.code_desc);
        }
        return result;
    });
};

export let getWordList = () => {
    return post(Api.APIURL_Content_Word_List)
        .then(result => {
            if (result.code !== '1') {
                return alert(result.code_desc);
            }
            return result;
        })
        .then(result => {
            let {wordLevelList, config} = result.result;
            wordLevelList.forEach(function(wordLevel) {
                wordLevel.wordList = wordLevel.wordList.map(function(item) {
                    let options = [
                        {zh: item.zh, isCorrect: true, value: 0},
                        {zh: item.zh_similar1, isCorrect: false, value: 1},
                        {zh: item.zh_similar2, isCorrect: false, value: 2},
                        {zh: item.zh_similar3, isCorrect: false, value: 3}
                    ];
                    options = _.shuffle(options);
                    return {
                        id: item.id,
                        word: item.word,
                        options: options
                    };
                });
            });
            return {
                wordLevelList: wordLevelList,
                config: config
            };
        })
        .catch(error => {
            console.log(error);
        });
};

export let saveContentWordResult = query => {
    return post(Api.APIURL_Content_Word_Result_Save, query);
};

export let queryContentWordResult = query => {
    return post(Api.APIURL_Content_Word_Result_Query, query);
};

export let queryContentWordResultList = query => {
    return post(Api.APIURL_Content_Word_Result_List, query);
};

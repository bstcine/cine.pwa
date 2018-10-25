import _ from 'lodash';
import { post } from '@/service/request';
import Api from '@/../APIConfig';

export let getContentWordConfig = query => {
    return post(Api.APIURL_Content_Word_Config, query).then(result => {
        if (result.code !== '1') {
            return alert(result.code_desc);
        }
        return result;
    });
};

export let updateLastIndex = (start_index, range, last_index) => {
    // 更新lastIndex
    let lastIndex = parseInt(last_index, 10);
    let lesson_id = `${lastIndex}-${lastIndex + 49}`;
    let estimate_range = `${start_index}-${start_index - 1 + range}`;
    let param = {
        lesson_id: lesson_id,
        estimate_range: estimate_range,
    };
    return post(Api.APIURL_User_Word_Lesson_Learn_Update, param);
};

export let getWordList = estimate => {
    let apiValue;
    let param;
    if (estimate) {
        apiValue = Api.APIURL_Content_Quiz_Word_List;
        let estimateComponent = estimate.split('-', 2);
        param = {
            location: estimateComponent[0],
            count: estimateComponent[1],
        };
    } else {
        apiValue = Api.APIURL_Content_Word_List;
        param = {};
    }
    console.log('获取测试词汇列表: ', apiValue, param);
    return post(apiValue, param)
        .then(result => {
            console.log(result);
            if (result.code !== '1') {
                return alert(result.code_desc);
            }
            return result;
        })
        .then(result => {
            let { wordLevelList, config } = result.result;
            wordLevelList.forEach(function(wordLevel) {
                wordLevel.wordList = wordLevel.wordList.map(function(item) {
                    let options = [
                        { zh: item.zh, isCorrect: true, value: 0 },
                        { zh: item.zh_similar1, isCorrect: false, value: 1 },
                        { zh: item.zh_similar2, isCorrect: false, value: 2 },
                        { zh: item.zh_similar3, isCorrect: false, value: 3 },
                    ];
                    options = _.shuffle(options);
                    return {
                        id: item.id,
                        word: item.word,
                        options: options,
                    };
                });
            });
            return {
                wordLevelList: wordLevelList,
                config: config,
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

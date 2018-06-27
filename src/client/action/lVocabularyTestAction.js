/**
 * Created by lidangkun on 2018/6/15.
 */
import Api from '../../APIConfig';
import { fetchData } from '@/service/base';
import { ACTION_LT } from '@/constant/actionTypeLearn';
import { toastAction } from '@/action/commonAction';
import errorMsg from '@/util/errorMsg';
import { fromJS } from 'immutable';
import vocabularyTestRedu from '../entry/learn/reducer/vocabularyTestReducer';

export const actionVocabularyTest = {

    _request: () => ({
        type: ACTION_LT.REQUEST,
    }),
    _receive: result => ({
        type: ACTION_LT.RECEIVE,
        payload: result.rows,
    }),
    _test: isStart => ({
        type: ACTION_LT.STARTTEST,
        payload: isStart,
    }),
    _changeContent: content => ({
        type: ACTION_LT.CHANGECONTENT,
        payload: content,
    }),
    _loadWords: (param, isInit) => async dispatch => {
        let [error, result] = await fetchData(Api.APIURL_User_Learn_Word, param);

        if (error) {
            dispatch(toastAction.showError(errorMsg(error)));
            return;
        }

        let content = actionVocabularyTest.getContent(result.rows, 0);
        dispatch(actionVocabularyTest._changeContent(content));
        dispatch(actionVocabularyTest._receive(result));
    },
    loadWords: (startIndex, endIndex, wordType) => async dispatch => {
        if (startIndex === 'undefined') {
            startIndex=undefined;
        }
        if (endIndex === 'undefined') {
            endIndex=undefined;
        }
        if (wordType === 'undefined') {
            wordType=undefined;
        }
        let param = {
            start_index: startIndex,
            end_index: endIndex,
            word_type: wordType,
        };
        dispatch(actionVocabularyTest._loadWords(param, true));
    },
    startTest: () => async dispatch => {
        dispatch(actionVocabularyTest._test(true));
    },
    changeIndex: () => async dispatch => {
        alert('下一个');
    },
    getContent: (rows, index) => {
        // 生成随机下表
        let randomCount = 3;
        if (rows.length <= 3) {
            randomCount = rows.length - 1;
        }
        alert(randomCount);
        // 随机生成下表数组
        let randomNumbers = actionVocabularyTest.getRandomNumbers(rows.length, randomCount);
        alert(fromJS(randomNumbers));
        let content = {
            index: index,
            wordCount: rows.length,
            correctCount: 0,
            value: rows[index].word,
            real_zh: 0,
            zh: ['123', '321', '231', '213'],
        };
        return content;
    },
    /**
     * @ 获取不重复的随机数（int）
     * @param max 最大范围
     * @param count 获取的数量
     * @return 随机数组
     */
    getRandomNumbers: (max, count) => {
        let numbers = []
        while (numbers.length < count) {
            let randomNumer = actionVocabularyTest.getRandomNumber(max);
            if (numbers.length === 0) {
                numbers.push(randomNumer);
                continue;
            }
            for (let i = 0; i < numbers.length; i++) {
                if (numbers[i] === randomNumer) {
                    continue;
                }
            }
            numbers.push(randomNumer);
        }
        return numbers;
    },
    /**
     * @ 获取随机数
     * @ max 最大范围
     * @return 生成数值
     * */
    getRandomNumber: (max) => {
        return Math.round(Math.random() * max);
    },
};
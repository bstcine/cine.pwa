/**
 * Created by lidangkun on 2018/6/15.
 */
import Api from '../../APIConfig';
import { fetchData } from '@/service/base';
import { ACTION_LT } from '@/constant/actionTypeLearn';
import { toastAction } from '@/action/commonAction';
import errorMsg from '@/util/errorMsg';

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

        let content = {
            index: 0,
            wordCount: result.rows.length,
            value: result.rows[0].word,
            real_zh: 0,
            zh: ['123', '321', '231', '213'],
        };
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
};
/**
 * Created by lidangkun on 2018/7/26.
 */
import Api from '../../APIConfig';
import { fetchData } from '@/service/base';
import { ACTION_LW } from '@/constant/actionTypeLearn';
export const wordAction = {
    _request: () => ({
        type: ACTION_LW.REQUEST,
    }),

    _receive: result => ({
        type: ACTION_LW.RECEIVE,
        payload: result,
    }),
    _currentRows: rows => ({
        type: ACTION_LW.CURRENTROWS,
        payload: rows,
    }),
    _isShowAll: status => ({
        type: ACTION_LW.CHANGESHOWALLSTATUS,
        payload: status,
    }),
    // 切换显示方式（是否显示全部）
    changeShowAllStatus: status => (dispatch, getState) => {
        let reducer = getState().WordRedu;
        let result = reducer.get('result');
        let newRows = [];
        if (status) {
            newRows = [...result.rows];
        } else {
            result.rows.forEach((ele) => {
                if (!ele.is_known) {
                    newRows.push(ele);
                }
            });
        }
        dispatch(wordAction._currentRows(newRows));
        dispatch(wordAction._isShowAll(status));
    },
    // 加载数据列表
    loadWordList: (param) => async dispatch => {

        let [error, result] = await fetchData(Api.APIURL_User_Learn_Word, param);

        if (!error) {
            dispatch(wordAction._receive(result));
            let currentRows = [];
            result.rows.forEach((ele) => {
                currentRows.push(ele);
            });
            dispatch(wordAction._currentRows(currentRows));
        } else {
            console.log(error);
        }
    },
    // 更新单词状态
    updateWordStatus: (index, is_known) => async (dispatch, getState) => {
        let reducer = getState().WordRedu;
        let isShowAll = reducer.get('isShowAll');
        let result = reducer.get('result');
        let currentRows = reducer.get('currentRows');
        let wordObject = currentRows[index];
        let resultIndex = 0;
        for (; resultIndex < result.rows.length; resultIndex++) {
            if (result.rows[resultIndex] === wordObject) {
                break;
            }
        }
        let newObject = { ...wordObject };
        newObject.is_known = is_known;
        if (isShowAll || !is_known) {
            currentRows.splice(index, 1, newObject);
            result.rows.splice(resultIndex, 1, newObject);
        } else {
            currentRows.splice(index, 1);
            result.rows.splice(resultIndex, 1);
        }
        let newRows = [...currentRows];
        dispatch(wordAction._currentRows(newRows));
        let [error, _updateRes] = await fetchData(Api.APIURL_User_Content_Word_UpdateKnow, { 'word': newObject.word, 'is_known': is_known });
        if (error || !_updateRes.status) {
            currentRows.splice(index, 1, wordObject);
            result.rows.splice(resultIndex, 1, wordObject);
            dispatch(wordAction._currentRows(currentRows));
        }
    },
};
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
            console.log('结果：', result);
            dispatch(wordAction._receive(result));
            let currentRows = [];
            result.rows.forEach((ele) => {
                if (ele.id.length > 5) {
                    ele.id = ele.id.slice(-5);
                }
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
        result.rows.splice(resultIndex, 1, newObject);
        currentRows.splice(index, 1, newObject);
        let newRows = [...currentRows];
        dispatch(wordAction._currentRows(newRows));
        let [error, _updateRes] = await fetchData(Api.APIURL_User_Content_Word_UpdateKnow, { 'word': newObject.word, 'is_known': is_known });
        if (error || !_updateRes.status) {
            currentRows.splice(index, 1, wordObject);
            result.rows.splice(resultIndex, 1, wordObject);
            dispatch(wordAction._currentRows(currentRows));
        }
    },
    // 更新course节点点击状态
    updateCourseSelectIndex: param => async (dispatch) => {
        if (!param.lesson_id) {
            return;
        }
        const indexComponent = param.lesson_id.split('-');
        let startIndex = indexComponent[0];
        let endIndex = indexComponent[1];
        startIndex = parseInt(startIndex, 10);
        endIndex = parseInt(endIndex, 10);
        if (startIndex % 50 !== 1) {
            return;
        }
        if (endIndex % 50 !== 0) {
            return;
        }
        if (endIndex - startIndex !== 49) {
            return;
        }
        let estimate_range;
        if (startIndex < 3001) {
            estimate_range = '1-3000';
        } else if (startIndex < 6001) {
            estimate_range = '3001-6000';
        } else {
            estimate_range = '6001-10000';
        }
        let updateParam = {
            'lesson_id': param.lesson_id,
            'estimate_range': estimate_range,
        };
        let [err, result] = await fetchData(Api.APIURL_User_Word_Lesson_Learn_Update, updateParam);
        if (result) {
            console.log('更新点击状态: \n', result);
        } else {
            console.log(err);
        }
    },
};
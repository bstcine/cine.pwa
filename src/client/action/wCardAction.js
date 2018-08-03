/**
 * Created by lidangkun on 2018/7/26.
 */
import Api from '../../APIConfig';
import { fetchData } from '@/service/base';
import { ACTION_WC } from '@/constant/actionTypeLearn';

export const wCardAction = {
    _request: () => ({
        type: ACTION_WC.REQUEST,
    }),

    _receive: result => ({
        type: ACTION_WC.RECEIVE,
        payload: result,
    }),
    _autoChangeWordStatus: status => ({
        type: ACTION_WC.AUTOCHANGEWORDSTATUS,
        payload: status,
    }),
    _reviseChangeWordStatus: status => ({
        type: ACTION_WC.REVISECHANGEWORDSTATUS,
        payload: status,
    }),
    _changeAutoTime: time => ({
        type: ACTION_WC.AUTOCHANGETIME,
        payload: time,
    }),
    _changeCurrentIndex: index => ({
        type: ACTION_WC.CHANGECURRENTINDEX,
        payload: index,
    }),
    _changeTimer: timer => ({
        type: ACTION_WC.CHANGEAUTOTIMER,
        payload: timer,
    }),
    _toggleBack: isBack => ({
        type: ACTION_WC.TOGGLEBACK,
        payload: isBack,
    }),
    _changeKnown: isKnown => ({
        type: ACTION_WC.CHANGEKNOWNSTATUS,
        payload: isKnown,
    }),
    _originRows: rows => ({
        type: ACTION_WC.ORIGINROWS,
        payload: rows,
    }),
    // 卡片式学习方法
    loadWordList: (param) => async dispatch => {

        let [error, result] = await fetchData(Api.APIURL_User_Learn_Word, param);

        if (!error) {
            // 备份原始数组
            dispatch(wCardAction._originRows(result.rows));
            // 移除所有已认识的单词
            let newRows = []
            result.rows.forEach((ele) => {
                if (!ele.is_known) {
                    newRows.push(ele);
                }
            });
            result.rows = newRows;
            dispatch(wCardAction._receive(result));
        }
    },
    // 改变自动播放状态
    changeAutoChangeWordStatus: () => async (dispatch, getState) => {
        let reducer = getState().WordCardRedu;
        let isAutoChangeWord = !reducer.get('isAutoChangeWord');
        let autoChangeTime = reducer.get('autoChangeTime');
        dispatch(wCardAction._autoChangeWordStatus(isAutoChangeWord));
        let timer = reducer.get('timer');
        if (timer) {
            clearInterval(timer);
        }
        if (isAutoChangeWord) {
            timer = setInterval(() => {
                dispatch(wCardAction.startNext());
            }, autoChangeTime * 1000);
        } else {
            timer = null;
        }
        dispatch(wCardAction._changeTimer(timer));
    },
    // 改变自动播放时间间隔
    changeAutoChangeTime: (time) => async dispatch => {
        dispatch(wCardAction._changeAutoTime(time));
    },
    // 改变随机播放状态
    changeReviseChangeWordStatus: () => async (dispatch, getState) => {
        let reducer = getState().WordCardRedu;
        let isReviseChangeWord = !reducer.get('isReviseChangeWord');
        dispatch(wCardAction._reviseChangeWordStatus(isReviseChangeWord));
    },
    // 切换正反面
    changFrontOrBack: () => (dispatch, getState) => {
        let reducer = getState().WordCardRedu;
        let isBack = !reducer.get('isBack');
        dispatch(wCardAction._toggleBack(isBack));
    },
    // 切换已认识状态
    changeKnownStatus: () => async (dispatch, getState) => {
        let reducer = getState().WordCardRedu;
        let isKnown = !reducer.get('isKnown');
        dispatch(wCardAction._changeKnown(isKnown));
    },
    // 更新已认识状态，并移除对应元素
    updateWordKnownStatus: () => async (dispatch, getState) => {
        let reducer = getState().WordCardRedu;
        let isKnown = reducer.get('isKnown');
        if (!isKnown) {
            return false;
        }
        let currentIndex = reducer.get('currentIndex');
        let result = reducer.get('result');
        let word = result.rows[currentIndex].word;
        let [error, _updateRes] = await fetchData(Api.APIURL_User_Content_Word_UpdateKnow, { 'word': word, 'is_known': true });
        if (error) {
            return false;
        } else {
            if (_updateRes.status === false) {
                return false;
            }
        }
        // 更新成功，移除当前元素
        result.rows[currentIndex].is_known = true;
        result.rows.splice(currentIndex, 1);
        return true;
    },
    // 再背一次
    repeatCard: () => async (dispatch, getState) => {
        let reducer = getState().WordCardRedu;
        let originRows = reducer.get('originRows');
        let wordList = [];
        originRows.forEach((ele) => {
            wordList.push(ele.word);
        });
        let [error, _updateRes] = await fetchData(Api.APIURL_User_Content_Word_UpdateKnow, { 'word_list': wordList, 'is_known': false });
        if (!error && _updateRes && _updateRes.status) {
            let newRows = [];
            originRows.forEach((ele) => {
                ele.is_known = false;
                newRows.push(ele);
            });
            let result = reducer.get('result');
            let newResult = {
                name: result.name,
                status: result.status,
                rows: newRows,
            }
            dispatch(wCardAction._changeCurrentIndex(0));
            dispatch(wCardAction._receive(newResult));
        }
    },
    // 背诵下一个单词
    startNext: () => async (dispatch, getState) => {
        let reducer = getState().WordCardRedu;
        let currentIndex = reducer.get('currentIndex');
        let result = reducer.get('result');
        let isBack = reducer.get('isBack');
        let isKnown = reducer.get('isKnown');
        let rows = result.rows;
        if (!rows || rows.length === 0) {
            return;
        }
        let updateStatus = await dispatch(wCardAction.updateWordKnownStatus());
        if (updateStatus) {
            currentIndex -= 1;
        }
        if (rows.length === currentIndex + 1) {
            currentIndex = 0;
        } else {
            currentIndex += 1;
        }
        dispatch(wCardAction._changeCurrentIndex(currentIndex));
        // 反面切换到正面
        if (isBack) {
            dispatch(wCardAction._toggleBack(false));
        }
        // 已认识切换到不认识
        if (isKnown) {
            dispatch(wCardAction._changeKnown(false));
        }
    },
    // 背诵上一个单词
    startPrevious: () => async (dispatch, getState) => {
        let reducer = getState().WordCardRedu;
        let currentIndex = reducer.get('currentIndex');
        let result = reducer.get('result');
        let isBack = reducer.get('isBack');
        let isKnown = reducer.get('isKnown');
        let rows = result.rows;
        if (!rows || rows.length === 0) {
            return;
        }
        let updateStatus = await dispatch(wCardAction.updateWordKnownStatus());
        if (updateStatus) {

        }
        if (currentIndex === 0) {
            currentIndex = rows.length - 1;
        } else {
            currentIndex -= 1;
        }
        dispatch(wCardAction._changeCurrentIndex(currentIndex));
        if (isBack) {
            dispatch(wCardAction._toggleBack(false));
        }
        // 已认识切换到不认识
        if (isKnown) {
            dispatch(wCardAction._changeKnown(false));
        }
    },
};
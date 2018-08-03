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
    // 卡片式学习方法
    loadWordList: (param) => async dispatch => {

        let [error, result] = await fetchData(Api.APIURL_User_Learn_Word, param);

        if (!error) {
            console.log(result);
            dispatch(wCardAction._receive(result));
        } else {
            console.log(error);
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
    // 背诵下一个单词
    startNext: () => async (dispatch, getState) => {
        let reducer = getState().WordCardRedu;
        let currentIndex = reducer.get('currentIndex');
        let result = reducer.get('result');
        let isBack = reducer.get('isBack');
        let rows = result.rows;
        if (!rows) {
            return;
        }
        if (rows.length === currentIndex + 1) {
            currentIndex = 0;
        } else {
            currentIndex += 1;
        }
        if (isBack) {
            isBack = false;
            dispatch(wCardAction._toggleBack(isBack));
        }
        dispatch(wCardAction._changeCurrentIndex(currentIndex));
    },
    // 背诵上一个单词
    startPrevious: () => async (dispatch, getState) => {
        let reducer = getState().WordCardRedu;
        let currentIndex = reducer.get('currentIndex');
        let result = reducer.get('result');
        let isBack = reducer.get('isBack');
        let rows = result.rows;
        if (!rows) {
            return;
        }
        if (currentIndex === 0) {
            currentIndex = rows.length - 1;
        } else {
            currentIndex -= 1;
        }
        if (isBack) {
            isBack = false;
            dispatch(wCardAction._toggleBack(isBack));
        }
        dispatch(wCardAction._changeCurrentIndex(currentIndex));
    },
};
/**
 * Created by lidangkun on 2018/7/26.
 */
import Api from '../../APIConfig';
import { fetchData } from '@/service/base';
import { ACTION_WC } from '@/constant/actionTypeLearn';

export const lWordCardAction = {
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
    // 卡片式学习方法
    loadWordList: (param) => async dispatch => {

        let [error, result] = await fetchData(Api.APIURL_User_Learn_Word, param);

        if (!error) {
            dispatch(lWordCardAction._receive(result));
        } else {
            console.log(error);
        }
    },
    // 改变自动播放状态
    changeAutoChangeWordStatus: () => async (dispatch, getState) => {
        let reducer = getState().WordCardRedu;
        let isAutoChangeWord = !reducer.get('isAutoChangeWord');
        dispatch(lWordCardAction._autoChangeWordStatus(isAutoChangeWord));
    },
    // 改变自动播放时间间隔
    changeAutoChangeTime: (time) => async dispatch => {
        dispatch(lWordCardAction._changeAutoTime(time));
    },
    // 改变随机播放状态
    changeReviseChangeWordStatus: () => async (dispatch, getState) => {
        let reducer = getState().WordCardRedu;
        let isReviseChangeWord = !reducer.get('isReviseChangeWord');
        dispatch(lWordCardAction._reviseChangeWordStatus(isReviseChangeWord));
    },
};
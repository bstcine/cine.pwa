/**
 * Created by lidangkun on 2018/6/15.
 */
import Api from '../../APIConfig';
import { fetchData } from '@/service/base';
import { fromJS } from 'immutable';
import { ACTION_LH } from '@/constant/actionTypeLearn';
import { toastAction } from '@/action/commonAction';
import errorMsg from '@/util/errorMsg';

export const actionHistoryTask = {
    _request: () => ({
        type : ACTION_LH.REQUEST,
    }),

    _receive: result => ({
        type: ACTION_LH.RECEIVE,
        payload: result.rows,
    }),
    _dialogShow: isShow => ({
        type: ACTION_LH.DIALOG,
        payload: isShow,
    }),
    _changeType: defaultType => ({
        type: ACTION_LH.CHANGETYPE,
        payload: defaultType,
    }),
    _changeStartTime: startTime => ({
        type:ACTION_LH.CHANGESTARTTIME,
        payload: startTime,
    }),
    _changeEndTime: endTime => ({
        type:ACTION_LH.CHANGEENDTIME,
        payload: endTime,
    }),

    _loadHistoryTask : (param,isInit) => async dispatch => {
        let [error,result] = await fetchData(Api.APIURL_User_Learn_Task,param);

        if (error) {
            dispatch(toastAction.showError(errorMsg(error)));
            return
        }

        // if (isInit) {
        //     dispatch(actionHistoryTask._changeStartTime(result.rows[0].effective_at));
        //     dispatch(actionHistoryTask._changeEndTime(result.rows[0].expire_at));
        // }

        dispatch(actionHistoryTask._receive(result));
        dispatch(actionHistoryTask._dialogShow(false));
    },

    // 加载历史任务数据
    loadHistoryTask: () =>  async dispatch => {
        dispatch(actionHistoryTask._loadHistoryTask({},true))
    },

    // dialog窗口显示/隐藏
    dialogShow: (isShow) => (dispatch) => {
        // 获取显示隐藏
        dispatch(actionHistoryTask._dialogShow(isShow));
    },

    // 改变选择类型
    changeType: (value) => async dispatch => {
        dispatch(actionHistoryTask._changeType(value));
    },

    // 改变起始时间
    changeStartTime: (value) => async dispatch => {
        dispatch(actionHistoryTask._changeStartTime(value));
    },

    // 改变结束时间
    changeEndTime: (value) => async dispatch => {
        dispatch(actionHistoryTask._changeEndTime(value));
    },

    // 开始搜索选择结果
    selectResult: (param) => async dispatch => {
        dispatch(actionHistoryTask._loadHistoryTask(param,false));
    },

};
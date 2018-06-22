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

    // 加载历史任务数据
    loadHistoryTask: () =>  async dispatch => {

        let [error,result] = await fetchData(Api.APIURL_User_Learn_Task);

        dispatch(actionHistoryTask._receive(result));
    },

    // dialog窗口显示/隐藏
    dialogShow: (isShow) => (dispatch) => {
        // 获取显示隐藏
        dispatch(actionHistoryTask._dialogShow(isShow));
    },

};
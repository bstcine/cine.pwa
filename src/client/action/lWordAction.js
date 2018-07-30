/**
 * Created by lidangkun on 2018/7/26.
 */
import Api from '../../APIConfig';
import { fetchData } from '@/service/base';
import { ACTION_LW } from '@/constant/actionTypeLearn';
export const lWordAction = {
    _request: () => ({
        type: ACTION_LW.REQUEST,
    }),

    _receive: result => ({
        type: ACTION_LW.RECEIVE,
        payload: result,
    }),
    // 卡片式学习方法
    loadWordList: (param) => async dispatch => {

        let [error, result] = await fetchData(Api.APIURL_User_Learn_Word, param);

        if (!error) {
            dispatch(lWordAction._receive(result));
        } else {
            console.log(error);
        }
    },
};
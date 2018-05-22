import Api from '../../APIConfig';
import { fetchData } from '@/service/base';
import { Action_UI, Action_UP } from '@/constant/actionTypeUser';

export const actionUserInfo = {
    request: () => ({
        type: Action_UI.REQUEST,
    }),
    receive: result => ({
        type: Action_UI.RECEIVE,
        payload: result,
    }),
    loadUserInfo: () => async dispatch => {
        dispatch(actionUserInfo.request());

        let [, result] = await fetchData(Api.APIURL_User_Info);
        dispatch(actionUserInfo.receive(result));
    },

    getUserInfo: function() {
        return fetchData(Api.APIURL_User_Info, {}).then(([err, result]) => {
            if (err) return Promise.resolve();
            return Promise.resolve(result);
        });
    },
};

export const actionUserPoint = {
    request: () => ({
        type: Action_UP.REQUEST,
    }),
    receive: (rows, remark) => ({
        type: Action_UP.RECEIVE,
        payload: { rows, remark },
    }),
    loadUserPoint: () => async dispatch => {
        dispatch(actionUserPoint.request());

        let param = {
            page: 1,
            pageSize: 300,
            orderBy: 'create_at',
            orderValue: 'desc',
        };
        let [, result] = await fetchData(Api.APIURL_User_Point, param);
        let rows = result.rows;

        let [, res] = await fetchData(Api.APIURL_Global_Integral_Rule, {
            part: '1',
            type: '1',
        });
        let remark = res.remark;

        dispatch(actionUserPoint.receive(rows, remark));
    },
};

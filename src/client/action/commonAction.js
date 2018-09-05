import { fetchData } from '@/service/base';
import gAction from '@/g/action';

export const superFetchDataWithShowLogin = (
    url,
    query,
    _config
) => async dispatch => {
    let config = Object.assign({ showLoading: true, showError: true }, _config);
    let timer = null;
    if (config.showLoading) {
        // 不在第一时间出现 loading，延迟 1s 之后出现
        timer = setTimeout(() => {
            dispatch(gAction.showLoading());
        }, 1000);
    }
    let [error, result] = await fetchData(url, query);
    if (config.showLoading) {
        timer && clearTimeout(timer);
        dispatch(gAction.hideLoading());
    }

    if (config.showError && error) dispatch(gAction.showMessage({ error }));

    return [error, result];
};

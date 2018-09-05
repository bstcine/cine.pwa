import { fetchData } from '@/service/base';
import { CToast } from '@/component/_base';

export const superFetchDataWithShowLogin = (
    url,
    query,
    _config
) => async dispatch => {
    let config = Object.assign({ showLoading: true, showError: true }, _config);
    let timer = null;
    let loading = null;
    if (config.showLoading) {
        // 不在第一时间出现 loading，延迟 1s 之后出现
        timer = setTimeout(() => {
            loading = CToast.loading();
        }, 1000);
    }
    let [error, result] = await fetchData(url, query);
    if (config.showLoading) {
        timer && clearTimeout(timer);
        loading.close();
    }

    if (config.showError && error) CToast.error(error);

    return [error, result];
};

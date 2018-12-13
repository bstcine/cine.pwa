import storeUtil from '@/util/storeUtil';
import axios from 'axios';

if (window.API_Host_URL) {
    axios.defaults.baseURL = window.API_Host_URL;
}
axios.defaults.headers['Cache-Control'] =
    'private, no-cache, no-store, must-revalidate';
axios.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        if (config.method === 'get') {
            if (!config.params || !config.params.token) {
                if (!config.params) config.params = {};
                config.params.token = storeUtil.getToken();
            }
        }

        if (config.method === 'post') {
            if (config.version === 2) {
                const _data = config.data;
                config.data = {
                    channel: '',
                    locale: 'zh_CN',
                    appver: '2.3.1',
                    data: _data,
                    token: storeUtil.getToken(),
                    sitecode: storeUtil.getSiteCode(),
                };
            }
        }
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

function httpBody(bodyData) {
    let _sitecode = storeUtil.getSiteCode();
    let _token = storeUtil.getToken();

    return {
        token: _token,
        sitecode: _sitecode,
        channel: '',
        locale: 'zh_CN',
        appver: '2.3.1',
        data: bodyData,
    };
}

export let post = (url, data) => {
    // let _httpBody = httpBody(data);
    // alert(_apiURL)
    // console.log(_httpBody);
    return axios.post(url, data, { version: 2 }).then(res => res.data);
};

export let get = (url, params) => {
    return axios.get(url, { params }).then(res => res.data);
};

export let postv1 = (url, data) => {
    return axios.post(url, data, { version: 1 }).then(res => res.data);
};

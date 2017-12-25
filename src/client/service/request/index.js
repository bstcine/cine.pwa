import * as storeUtil from '@/util/storeUtil'
import axios from 'axios'

function httpUrl(url) {

    let baseURL = typeof app_API_Host_URL === "undefined" ? "" : app_API_Host_URL
    if (url.indexOf('http') >= 0) {
        baseURL = ""
    }

    return baseURL + url;
}

function httpBody(bodyData) {

    let token = bodyData ? bodyData.token : null
    if (!token) token = storeUtil.getToken() || ""
    let sitecode = storeUtil.get('sitecode') || "cine.web"

    return {
        "token": token,
        "sitecode": sitecode,
        "channel": "",
        "locale": "zh_CN",
        "appver": 10000,
        "data": bodyData
    };
}

export let post = (url, data) => {

    let _apiURL = httpUrl(url);
    let _httpBody = httpBody(data);

    //alert(_apiURL)
    return axios.post(_apiURL, _httpBody)
        .then(response => response.data)

};

export let get = (url) => {

    let _apiURL = httpUrl(url);
    return axios.get(_apiURL).then(response => response.data)
};
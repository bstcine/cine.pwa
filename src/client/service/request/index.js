import storeUtil from '@/util/storeUtil'
import axios from 'axios'

function httpUrl(url) {

    let baseURL = typeof app_API_Host_URL === "undefined" ? "" : app_API_Host_URL
    if (url.indexOf('http') >= 0) {
        baseURL = ""
    }

    return baseURL + url;
}

function httpBody(bodyData) {
    let token;
    if (typeof bodyData.token !== 'undefined') {
        token = bodyData.token
    } else {
        token = storeUtil.getToken()
    }
    let sitecode = storeUtil.get('sitecode') || "cine.web"

    console.log(`token --->>> ${token}`)
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
        .then(res => {
            if (res.code !== '1') {
                return alert(res.code_desc)
            }
            return res
        })

};

export let get = (url, params) => {

    let _apiURL = httpUrl(url);
    return axios.get(_apiURL, {params}).then(response => response.data)
};


export let postv1 = (url, data) => {

    let _apiURL = httpUrl(url);

    //alert(_apiURL)
    return axios.post(_apiURL, data)
        .then(response => response.data)

};
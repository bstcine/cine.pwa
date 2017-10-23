import * as request from './request';
import * as api from './request/api';

let baseURL = app_API_Http_URL;
let postBodyData = {
    "filter": { "page_num": 1, "page_size": 18 },
    "article_id": "besichtigen"
};

export let request_page_size = 24;

export let findAll = (filter) => {

    postBodyData.filter.page_num = filter.page;
    postBodyData.filter.page_size = request_page_size;

    let _bodyData = postBodyData
    let _apiURL = baseURL + api.APIURL_Content_Article_List;
    return request.post(_apiURL, _bodyData)
        .then(data => {
            return data.result
        })
}

export let detail = (filter) => {
    let _bodyData = filter
    let _apiURL = baseURL + api.APIURL_Content_Article_Detail;
    return request.post(_apiURL, _bodyData)
        .then(data => {
            return data.result
        })

}

export let update = (data) => {
    let _bodyData = data;
    let _apiURL = baseURL + api.APIURL_Content_Article_Post;
    return request.post(_apiURL, _bodyData)
        .then(data => {
            return data.result
        })
}

export let updateStatus = (data) => {
    let _bodyData = data;
    let _apiURL = baseURL + api.APIURL_Content_Article_Status_Update;
    return request.post(_apiURL, _bodyData)
        .then(data => {
            return data.result
        })
}

export let crawlArticle = (filter) => {

    let _bodyData = filter;
    let _apiURL = baseURL + api.APIURL_Content_Crawler_Article;
    return request.post(_apiURL, _bodyData)
        .then(data => {
            return data
        })

}

export let crawlHttpUrl = (filter) => {

    let _bodyData = filter
    let _apiURL = baseURL + api.APIURL_Content_Crawler_Http_URL;
    return request.post(_apiURL, _bodyData)
        .then(data => {
            return data.result
        })

}




/**
 * Created by david on 2017/12/6.
 */
import {get, post, postv1} from './request/index';
import {getPureUrl} from '@/util/urlUtil';
import Api from '@/../APIConfig';
import storeUtil from '@/util/storeUtil';

export let getWechatJsSignature = () => {
    let signatureUrl = getPureUrl();
    return get(Api.APIURL_Wechat_Js_Signature, {url: signatureUrl});
};

export let userInfo = token => {
    return post(Api.APIURL_User_Info, {token}).then(res => {
        if (res.except_case_desc) {
            return {error: new Error(res.except_case_desc)};
        }
        return {data: res.result};
    });
};


export let login = ({username, password}) => {
    return post(Api.APIURL_Auth_Signin, {phone: username, password});
};

export let logoutV1 = () => {
    return get(Api.APIURL_LogoutV1, {type: 'json'});
};

export let accessLog = () => {
    return post(Api.APIURL_System_AccessLog_Create);
};

export let fetchData = (APIURL , query) => {
    return post(APIURL, query).then(response => {
        return [response.except_case_desc, response.result]
    })
}
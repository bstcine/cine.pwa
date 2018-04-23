/**
 * Created by david on 2017/12/6.
 */
import { get, post } from './request/index';
import { getPureUrl } from '@/util/urlUtil';
import Api from '@/../APIConfig';

/**
 * 通用数据层
 * @param APIURL
 * @param query
 * @returns {PromiseLike<T> | Promise<T>}
 */
export let fetchData = async (APIURL, query) => {
    try {
        let { except_case_desc, result } = await post(APIURL, query);
        return [except_case_desc, result];
    } catch (error) {
        return [error];
    }
};

export let getWechatJsSignature = () => {
    let signatureUrl = getPureUrl();
    return get(Api.APIURL_Wechat_Js_Signature, { url: signatureUrl });
};

export let login = ({ username, password }) => {
    return post(Api.APIURL_Auth_Signin, { phone: username, password });
};

export let logoutV1 = () => {
    return get(Api.APIURL_LogoutV1, { type: 'json' });
};

export let accessLog = () => {
    return post(Api.APIURL_System_AccessLog_Create);
};

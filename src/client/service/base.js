/**
 * Created by david on 2017/12/6.
 */
import { get, post } from './request/index';
import { getPureUrl } from '@/util/_base/urlUtil';
import Api from '@/../APIConfig';

/**
 * 通用数据层
 * @param APIURL
 * @param query
 * @param type
 * @returns {PromiseLike<T> | Promise<T>}
 */
export let fetchData = async (APIURL, query, type = 'POST') => {
    try {
        console.log('fetchData type', type);
        const network = type === 'POST' ? post : get;
        let { code_desc, except_case_desc, result } = await network(
            APIURL,
            query
        );
        let error = null;
        if (code_desc !== 'success') {
            error = code_desc;
        } else {
            error = except_case_desc;
        }
        return [error, result];
    } catch (error) {
        return [error];
    }
};

export let getWechatJsSignature = () => {
    let signatureUrl = getPureUrl();
    return get(Api.APIURL_Wechat_Js_Signature, { url: signatureUrl });
};

export let login = ({ username, password }) => {
    return post(Api.APIURL_Auth_SignIn, { phone: username, password });
};

export let logoutV1 = () => {
    return get(Api.APIURL_LogoutV1, { type: 'json', t: new Date().getTime() });
};

export let accessLog = () => {
    return post(Api.APIURL_System_AccessLog_Create);
};

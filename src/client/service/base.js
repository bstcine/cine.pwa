/**
 * Created by david on 2017/12/6.
 */
import {get, post, postv1} from './request/index'
import {getPureUrl} from '@/util/urlUtil'
import Api from '@/../APIConfig'
import storeUtil from "@/util/storeUtil";

export let getWechatJsSignature = () => {
    let signatureUrl = getPureUrl()
    return get(Api.APIURL_Wechat_Js_Signature, {url: signatureUrl})
}

export let userInfo = (token) => {
    return post(Api.APIURL_User_Info, {token}).then(res => {
        if (res.except_case_desc) {
            console.log(res.except_case_desc)
            return Promise.reject(new Error(res.except_case_desc))
        }
        return res.result
    })
}

export let loginV1 = ({username, password}) => {
    return postv1(Api.APIURL_LoginV1, {username, password,sitecode:storeUtil.getSiteCode()})
}

export let login = ({username, password}) => {
    return post(Api.APIURL_Auth_Signin, {phone: username, password})
}

export let logoutV1 = () => {
    return get(Api.APIURL_LogoutV1, {type: 'json'})
}

export let accessLog = () => {
    return post(Api.APIURL_System_AccessLog_Create)
}